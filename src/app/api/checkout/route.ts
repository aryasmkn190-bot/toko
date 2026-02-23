import { NextRequest, NextResponse } from "next/server";
import { generatePaymentUrl } from "@/lib/pakasir";
import { getProductById, generateOrderId } from "@/lib/products";

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
            console.error("Missing PAKASIR env vars");
            return NextResponse.json(
                { error: "Konfigurasi payment gateway belum lengkap" },
                { status: 500 }
            );
        }

        // Generate order ID that encodes product + phone
        // This way the webhook can extract customer info without a database
        const orderId = generateOrderId(product.id, customerPhone);
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Generate Pakasir payment URL
        const paymentUrl = generatePaymentUrl(
            process.env.PAKASIR_PROJECT_SLUG,
            product.price,
            orderId,
            {
                redirect: `${appUrl}/payment/success?order_id=${orderId}&name=${encodeURIComponent(customerName)}`,
            }
        );

        console.log("Order created:", {
            orderId,
            product: product.name,
            amount: product.price,
            phone: customerPhone,
        });

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
