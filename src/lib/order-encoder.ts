/**
 * Compact order ID encoding/decoding.
 * Encodes productId + phone into a short URL-safe string
 * so raw phone numbers are not exposed in order_ids.
 *
 * Format: FK{productIndex}{encodedPhone}{2-char random}
 * Example: FK1A7B3KX2MN (much shorter than before!)
 *
 * This is NOT encryption - it's obfuscation to prevent
 * casual exposure of phone numbers. For true security,
 * use a database.
 */

const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // 32 chars, no I/O
const BASE = BigInt(CHARSET.length);
const XOR_KEY = BigInt(0x5F4B); // Simple XOR key for obfuscation

// Map product IDs to single characters and back
const PRODUCT_MAP: Record<string, string> = {
    "P01": "1",
    "P02": "2",
    "P03": "3",
    "P04": "4",
    "P05": "5",
};

const REVERSE_PRODUCT_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(PRODUCT_MAP).map(([k, v]) => [v, k])
);

function encodePhone(phone: string): string {
    // Convert phone digits to a BigInt, XOR for obfuscation, then base32 encode
    const num = BigInt(phone) ^ XOR_KEY;
    let encoded = "";
    let n = num;
    while (n > BigInt(0)) {
        encoded = CHARSET[Number(n % BASE)] + encoded;
        n = n / BASE;
    }
    return encoded;
}

function decodePhone(encoded: string): string {
    // base32 decode back to BigInt, then XOR to recover
    let num = BigInt(0);
    for (const char of encoded) {
        const idx = CHARSET.indexOf(char);
        if (idx === -1) return "";
        num = num * BASE + BigInt(idx);
    }
    const phone = (num ^ XOR_KEY).toString();
    return phone;
}

/**
 * Generate a compact order ID.
 * Format: FK{productChar}{encodedPhone}{2-char random}
 * Total length: ~14-18 chars (vs ~40 before)
 */
export function generateOrderId(productId: string, phone: string): string {
    const productChar = PRODUCT_MAP[productId] || "0";
    const encodedPhone = encodePhone(phone);
    const rand = CHARSET[Math.floor(Math.random() * CHARSET.length)]
        + CHARSET[Math.floor(Math.random() * CHARSET.length)];
    return `FK${productChar}${encodedPhone}${rand}`;
}

/**
 * Parse order ID to extract product ID and phone.
 */
export function parseOrderId(orderId: string): { productId: string; phone: string } | null {
    try {
        if (!orderId.startsWith("FK") || orderId.length < 8) return null;

        // FK + 1 char product + encoded phone + 2 char random
        const productChar = orderId[2];
        const productId = REVERSE_PRODUCT_MAP[productChar];
        if (!productId) return null;

        // Remove FK(1) prefix and last 2 random chars
        const encodedPhone = orderId.substring(3, orderId.length - 2);
        const phone = decodePhone(encodedPhone);

        if (!phone || phone.length < 10) return null;

        return { productId, phone };
    } catch {
        return null;
    }
}
