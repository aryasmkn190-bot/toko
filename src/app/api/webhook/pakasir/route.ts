import { NextRequest, NextResponse } from "next/server";
import { PakasirWebhookPayload, getTransactionDetail } from "@/lib/pakasir";
import { getProductById } from "@/lib/products";
import { parseOrderId } from "@/lib/order-encoder";
import {
    sendWhatsAppMessage,
    buildPurchaseMessage,
    buildAdminNotification,
} from "@/lib/evolution-api";

// Product links mapping - replace with your actual Google Sheet links
const PRODUCT_LINKS: Record<string, string> = {
    "P01": "https://drive.google.com/drive/folders/1YG5U1RRynf90zCIVUYtc5FxCndP_16dT?usp=sharing",
    "P02": "https://drive.google.com/drive/folders/1GnesjTPH_CbqU1fmxkb7pZQpl5Ahy1vp?usp=sharing",
    "P03": "https://drive.google.com/drive/folders/1YHXI8MTcjmc_6B2MyQfBI54Agf5k2vwI?usp=sharing",
};

// Simple dedup: track processed order IDs to prevent duplicate sends
// Note: This resets on cold starts, but combined with Pakasir API verification
// it provides reasonable protection against duplicate webhook deliveries
const processedOrders = new Set<string>();

export async function POST(request: NextRequest) {
    try {
        const payload: PakasirWebhookPayload = await request.json();

        console.log("Webhook received:", JSON.stringify(payload));

        // Only process completed payments
        if (payload.status !== "completed") {
            console.log("Ignoring non-completed webhook:", payload.status);
            return NextResponse.json({ received: true, processed: false });
        }

        // Dedup check - prevent duplicate WhatsApp sends
        if (processedOrders.has(payload.order_id)) {
            console.log("Duplicate webhook, already processed:", payload.order_id);
            return NextResponse.json({
                received: true,
                processed: false,
                reason: "already_processed",
            });
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

        // SECURITY: Verify payment with Pakasir Transaction Detail API
        // This prevents fake webhooks from triggering product delivery
        try {
            const txDetail = await getTransactionDetail(payload.order_id, product.price);

            if (txDetail.transaction.status !== "completed") {
                console.error(`Transaction not completed on Pakasir: ${payload.order_id}, status: ${txDetail.transaction.status}`);
                return NextResponse.json(
                    { error: "Transaction not verified as completed" },
                    { status: 400 }
                );
            }

            if (txDetail.transaction.amount !== product.price) {
                console.error(`Amount mismatch: expected ${product.price}, got ${txDetail.transaction.amount}`);
                return NextResponse.json(
                    { error: "Amount mismatch" },
                    { status: 400 }
                );
            }

            console.log("Payment verified via Pakasir API ✅");
        } catch (verifyError) {
            console.error("Failed to verify payment with Pakasir:", verifyError);
            return NextResponse.json(
                { error: "Could not verify payment" },
                { status: 500 }
            );
        }

        // Mark as processed BEFORE sending (prevent duplicate sends on retry)
        processedOrders.add(payload.order_id);

        const productLink = PRODUCT_LINKS[productId] || "https://example.com/product";

        console.log("Processing verified payment:", {
            orderId: payload.order_id,
            product: product.name,
            phone,
            amount: payload.amount,
        });

        // 1. Send product link to customer via WhatsApp
        const customerMessage = buildPurchaseMessage(
            "Pelanggan",
            product.name,
            payload.order_id,
            productLink
        );

        let customerSent = await sendWhatsAppMessage(phone, customerMessage);

        // Retry once if failed
        if (!customerSent) {
            console.log("Retrying WhatsApp send to customer...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            customerSent = await sendWhatsAppMessage(phone, customerMessage);
        }

        if (!customerSent) {
            console.error("CRITICAL: Failed to send product to customer after retry!", {
                phone,
                orderId: payload.order_id,
            });
            // Remove from processed so it can be retried on next webhook
            processedOrders.delete(payload.order_id);
        }

        // 2. Notify admin (always attempt, even if customer send failed)
        const adminPhone = process.env.NEXT_PUBLIC_WA_ADMIN;
        if (adminPhone) {
            const statusEmoji = customerSent ? "✅" : "❌";
            const adminMessage = buildAdminNotification(
                "Pelanggan",
                phone,
                product.name,
                payload.order_id,
                payload.amount,
                payload.payment_method
            ) + `\n\n📦 Pengiriman WA: ${statusEmoji} ${customerSent ? "Berhasil" : "GAGAL - Kirim manual!"}`;

            await sendWhatsAppMessage(adminPhone, adminMessage);
        }

        return NextResponse.json({
            received: true,
            processed: true,
            orderId: payload.order_id,
            productSent: customerSent,
        });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
