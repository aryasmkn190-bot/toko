const PAKASIR_API_BASE = "https://app.pakasir.com/api";

interface PakasirTransactionRequest {
    project: string;
    order_id: string;
    amount: number;
    api_key: string;
}

interface PakasirPaymentResponse {
    payment: {
        project: string;
        order_id: string;
        amount: number;
        fee: number;
        total_payment: number;
        payment_method: string;
        payment_number: string;
        expired_at: string;
    };
}

interface PakasirTransactionDetail {
    transaction: {
        amount: number;
        order_id: string;
        project: string;
        status: string;
        payment_method: string;
        completed_at: string;
    };
}

export interface PakasirWebhookPayload {
    amount: number;
    order_id: string;
    project: string;
    status: string;
    payment_method: string;
    completed_at: string;
}

export async function createTransaction(
    orderId: string,
    amount: number,
    method: string = "qris"
): Promise<PakasirPaymentResponse> {
    const body: PakasirTransactionRequest = {
        project: process.env.PAKASIR_PROJECT_SLUG!,
        order_id: orderId,
        amount,
        api_key: process.env.PAKASIR_API_KEY!,
    };

    const res = await fetch(`${PAKASIR_API_BASE}/transactioncreate/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Pakasir transaction create failed: ${res.status} - ${text}`);
    }

    return res.json();
}

export async function getTransactionDetail(
    orderId: string,
    amount: number
): Promise<PakasirTransactionDetail> {
    const params = new URLSearchParams({
        project: process.env.PAKASIR_PROJECT_SLUG!,
        amount: amount.toString(),
        order_id: orderId,
        api_key: process.env.PAKASIR_API_KEY!,
    });

    const res = await fetch(
        `${PAKASIR_API_BASE}/transactiondetail?${params.toString()}`
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Pakasir transaction detail failed: ${res.status} - ${text}`);
    }

    return res.json();
}

export async function cancelTransaction(
    orderId: string,
    amount: number
): Promise<void> {
    const body: PakasirTransactionRequest = {
        project: process.env.PAKASIR_PROJECT_SLUG!,
        order_id: orderId,
        amount,
        api_key: process.env.PAKASIR_API_KEY!,
    };

    const res = await fetch(`${PAKASIR_API_BASE}/transactioncancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Pakasir transaction cancel failed: ${res.status} - ${text}`);
    }
}

export function generatePaymentUrl(
    slug: string,
    amount: number,
    orderId: string,
    options?: {
        redirect?: string;
        qrisOnly?: boolean;
    }
): string {
    let url = `https://app.pakasir.com/pay/${slug}/${amount}?order_id=${orderId}`;

    if (options?.redirect) {
        url += `&redirect=${encodeURIComponent(options.redirect)}`;
    }

    if (options?.qrisOnly) {
        url += `&qris_only=1`;
    }

    return url;
}
