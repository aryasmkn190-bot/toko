import { NextRequest, NextResponse } from "next/server";
import { PakasirWebhookPayload } from "@/lib/pakasir";
import { getOrder, updateOrderStatus } from "@/lib/orders";
import {
    sendWhatsAppMessage,
    buildPurchaseMessage,
    buildAdminNotification,
} from "@/lib/evolution-api";
import { getProductById } from "@/lib/products";

// Product links mapping - replace with your actual Google Sheet links
const PRODUCT_LINKS: Record<string, string> = {
    "prod-001": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_1/copy",
    "prod-002": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_2/copy",
    "prod-003": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_3/copy",
    "prod-004": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_4/copy",
    "prod-005": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_BUNDLE/copy",
};

export async function POST(request: NextRequest) {
    try {
        const payload: PakasirWebhookPayload = await request.json();

        console.log("Webhook received:", JSON.stringify(payload));

        // Validate webhook
        if (payload.status !== "completed") {
            return NextResponse.json({ received: true, processed: false });
        }

        const order = getOrder(payload.order_id);

        if (!order) {
            console.error(`Order not found: ${payload.order_id}`);
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Validate amount
        if (payload.amount !== order.amount) {
            console.error(
                `Amount mismatch for ${payload.order_id}: expected ${order.amount}, got ${payload.amount}`
            );
            return NextResponse.json(
                { error: "Amount mismatch" },
                { status: 400 }
            );
        }

        // Update order status
        updateOrderStatus(order.orderId, "completed", payload.completed_at);

        // Get product link
        const product = getProductById(order.productId);
        const productLink =
            PRODUCT_LINKS[order.productId] || "https://example.com/product";

        // Send WhatsApp messages
        if (product) {
            // 1. Send product link to customer
            const customerMessage = buildPurchaseMessage(
                order.customerName,
                product.name,
                order.orderId,
                productLink
            );
            await sendWhatsAppMessage(order.customerPhone, customerMessage);

            // 2. Notify admin
            const adminPhone = process.env.NEXT_PUBLIC_WA_ADMIN;
            if (adminPhone) {
                const adminMessage = buildAdminNotification(
                    order.customerName,
                    order.customerPhone,
                    product.name,
                    order.orderId,
                    order.amount,
                    payload.payment_method
                );
                await sendWhatsAppMessage(adminPhone, adminMessage);
            }
        }

        return NextResponse.json({
            received: true,
            processed: true,
            orderId: order.orderId,
        });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
