import { NextRequest, NextResponse } from "next/server";
import { generatePaymentUrl } from "@/lib/pakasir";
import { getProductById } from "@/lib/products";
import { generateOrderId } from "@/lib/order-encoder";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, customerName, customerPhone, customerEmail } = body;

        // Validate required fields
        if (!productId || !customerName || !customerPhone || !customerEmail) {
            return NextResponse.json(
                { error: "Data tidak lengkap" },
                { status: 400 }
            );
        }

        // Validate phone format
        const phone = customerPhone.replace(/[^0-9]/g, "");
        if (phone.length < 10 || phone.length > 15) {
            return NextResponse.json(
                { error: "Nomor WhatsApp tidak valid" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return NextResponse.json(
                { error: "Format email tidak valid" },
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

        // Generate encoded order ID (phone is obfuscated, not plain text)
        const orderId = generateOrderId(product.id, phone);
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // Generate Pakasir payment URL
        const paymentUrl = generatePaymentUrl(
            process.env.PAKASIR_PROJECT_SLUG,
            product.price,
            orderId,
            {
                redirect: `${appUrl}/payment/success?order_id=${orderId}`,
            }
        );

        console.log("Order created:", {
            orderId,
            product: product.name,
            amount: product.price,
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
