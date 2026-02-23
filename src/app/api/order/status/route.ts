import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
        return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const order = getOrder(orderId);

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
        orderId: order.orderId,
        productName: order.productName,
        amount: order.amount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        completedAt: order.completedAt,
    });
}
