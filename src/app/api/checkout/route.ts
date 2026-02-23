import { NextRequest, NextResponse } from "next/server";
import { createTransaction, generatePaymentUrl } from "@/lib/pakasir";
import { createOrder } from "@/lib/orders";
import { getProductById } from "@/lib/products";
import { generateOrderId } from "@/lib/products";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, customerName, customerPhone, customerEmail, paymentMethod } = body;

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

        const orderId = generateOrderId();
        const method = paymentMethod || "qris";
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        // If using URL method (simpler)
        if (method === "url") {
            const paymentUrl = generatePaymentUrl(
                process.env.PAKASIR_PROJECT_SLUG!,
                product.price,
                orderId,
                {
                    redirect: `${appUrl}/payment/success?order_id=${orderId}`,
                }
            );

            createOrder({
                orderId,
                productId: product.id,
                productName: product.name,
                customerName,
                customerPhone,
                customerEmail,
                amount: product.price,
                status: "pending",
                paymentMethod: method,
                createdAt: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true,
                orderId,
                paymentUrl,
                method: "url",
            });
        }

        // API method - create transaction via Pakasir API
        const result = await createTransaction(orderId, product.price, method);

        createOrder({
            orderId,
            productId: product.id,
            productName: product.name,
            customerName,
            customerPhone,
            customerEmail,
            amount: product.price,
            status: "pending",
            paymentMethod: method,
            paymentNumber: result.payment.payment_number,
            expiredAt: result.payment.expired_at,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            orderId,
            payment: result.payment,
            method: "api",
        });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat memproses pembayaran" },
            { status: 500 }
        );
    }
}
