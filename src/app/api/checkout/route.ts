import { NextRequest, NextResponse } from "next/server";
import { generatePaymentUrl } from "@/lib/pakasir";
import { createOrder } from "@/lib/orders";
import { getProductById } from "@/lib/products";
import { generateOrderId } from "@/lib/products";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, customerName, customerPhone, customerEmail } = body;

        // Validate
        if (!productId || !customerName || !customerPhone || !customerEmail) {
            return NextResponse.json(
                { error: "Data tidak lengkap" },
                { status: 400 }
            );
        }

        const product = getProductById(productId);
        if (!product) {
            return NextResponse.json(
                { error: "Produk tidak ditemukan" },
                { status: 404 }
            );
        }

        // Check env vars
        if (!process.env.PAKASIR_PROJECT_SLUG || !process.env.PAKASIR_API_KEY) {
            console.error("Missing PAKASIR env vars:", {
                slug: !!process.env.PAKASIR_PROJECT_SLUG,
                apiKey: !!process.env.PAKASIR_API_KEY,
            });
            return NextResponse.json(
                { error: "Konfigurasi payment gateway belum lengkap" },
                { status: 500 }
            );
        }

        const orderId = generateOrderId();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Generate Pakasir payment URL (redirect method)
        // This is more reliable - Pakasir handles the payment UI
        const paymentUrl = generatePaymentUrl(
            process.env.PAKASIR_PROJECT_SLUG,
            product.price,
            orderId,
            {
                redirect: `${appUrl}/payment/success?order_id=${orderId}`,
            }
        );

        // Save order
        createOrder({
            orderId,
            productId: product.id,
            productName: product.name,
            customerName,
            customerPhone,
            customerEmail,
            amount: product.price,
            status: "pending",
            paymentMethod: "pakasir",
            createdAt: new Date().toISOString(),
        });

        console.log("Order created:", { orderId, product: product.name, amount: product.price });

        return NextResponse.json({
            success: true,
            orderId,
            paymentUrl,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Checkout error:", errorMessage);
        return NextResponse.json(
            { error: `Gagal memproses pembayaran: ${errorMessage}` },
            { status: 500 }
        );
    }
}
