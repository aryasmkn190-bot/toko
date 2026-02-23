import { NextRequest, NextResponse } from "next/server";
import { PakasirWebhookPayload } from "@/lib/pakasir";
import { parseOrderId, getProductById } from "@/lib/products";
import {
    sendWhatsAppMessage,
    buildPurchaseMessage,
    buildAdminNotification,
} from "@/lib/evolution-api";

// Product links mapping - replace with your actual Google Sheet links
const PRODUCT_LINKS: Record<string, string> = {
    "P01": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_1/copy",
    "P02": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_2/copy",
    "P03": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_3/copy",
    "P04": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_4/copy",
    "P05": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_BUNDLE/copy",
};

export async function POST(request: NextRequest) {
    try {
        const payload: PakasirWebhookPayload = await request.json();

        console.log("Webhook received:", JSON.stringify(payload));

        // Only process completed payments
        if (payload.status !== "completed") {
            console.log("Ignoring non-completed webhook:", payload.status);
            return NextResponse.json({ received: true, processed: false });
        }

        // Parse order ID to extract product + phone
        const orderInfo = parseOrderId(payload.order_id);

        if (!orderInfo) {
            console.error(`Could not parse order_id: ${payload.order_id}`);
            return NextResponse.json(
                { error: "Invalid order_id format" },
                { status: 400 }
            );
        }

        const { productId, phone } = orderInfo;
        const product = getProductById(productId);

        if (!product) {
            console.error(`Product not found for ID: ${productId}`);
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Validate amount matches product price
        if (payload.amount !== product.price) {
            console.error(
                `Amount mismatch for ${payload.order_id}: expected ${product.price}, got ${payload.amount}`
            );
            return NextResponse.json(
                { error: "Amount mismatch" },
                { status: 400 }
            );
        }

        const productLink = PRODUCT_LINKS[productId] || "https://example.com/product";

        console.log("Processing payment:", {
            orderId: payload.order_id,
            product: product.name,
            phone,
            amount: payload.amount,
        });

        // 1. Send product link to customer via WhatsApp
        const customerMessage = buildPurchaseMessage(
            "Pelanggan", // Name from order_id isn't stored, use generic
            product.name,
            payload.order_id,
            productLink
        );
        const customerSent = await sendWhatsAppMessage(phone, customerMessage);
        console.log("Customer WA sent:", customerSent);

        // 2. Notify admin
        const adminPhone = process.env.NEXT_PUBLIC_WA_ADMIN;
        if (adminPhone) {
            const adminMessage = buildAdminNotification(
                "Pelanggan",
                phone,
                product.name,
                payload.order_id,
                payload.amount,
                payload.payment_method
            );
            const adminSent = await sendWhatsAppMessage(adminPhone, adminMessage);
            console.log("Admin WA sent:", adminSent);
        }

        return NextResponse.json({
            received: true,
            processed: true,
            orderId: payload.order_id,
            productSent: product.name,
            customerPhone: phone,
        });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
