// In-memory store for orders (in production, use a database)
// This is sufficient for a simple landing page

export interface Order {
    orderId: string;
    productId: string;
    productName: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    amount: number;
    status: "pending" | "completed" | "cancelled" | "expired";
    paymentMethod: string;
    paymentNumber?: string;
    expiredAt?: string;
    createdAt: string;
    completedAt?: string;
}

// In-memory store
const orders = new Map<string, Order>();

export function createOrder(order: Order): void {
    orders.set(order.orderId, order);
}

export function getOrder(orderId: string): Order | undefined {
    return orders.get(orderId);
}

export function updateOrderStatus(
    orderId: string,
    status: Order["status"],
    completedAt?: string
): void {
    const order = orders.get(orderId);
    if (order) {
        order.status = status;
        if (completedAt) {
            order.completedAt = completedAt;
        }
        orders.set(orderId, order);
    }
}

export function getOrdersByPhone(phone: string): Order[] {
    return Array.from(orders.values()).filter(
        (o) => o.customerPhone === phone
    );
}
