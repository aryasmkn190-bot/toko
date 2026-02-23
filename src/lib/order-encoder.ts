/**
 * Simple encoding/decoding for order data.
 * Encodes productId + phone into a URL-safe string
 * so raw phone numbers are not exposed in order_ids.
 * 
 * This is NOT encryption - it's obfuscation to prevent
 * casual exposure of phone numbers. For true security,
 * use a database.
 */

const CHARSET = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I, O to avoid confusion

function simpleEncode(input: string): string {
    // XOR with a simple key then convert to base32-like
    const key = "FK"; // FinanceKit
    let encoded = "";
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        encoded += CHARSET[charCode % CHARSET.length];
        encoded += CHARSET[Math.floor(charCode / CHARSET.length) % CHARSET.length];
    }
    return encoded;
}

function simpleDecode(encoded: string): string {
    const key = "FK";
    let decoded = "";
    for (let i = 0; i < encoded.length; i += 2) {
        const idx1 = CHARSET.indexOf(encoded[i]);
        const idx2 = CHARSET.indexOf(encoded[i + 1]);
        if (idx1 === -1 || idx2 === -1) return "";
        const charCode = (idx2 * CHARSET.length + idx1) ^ key.charCodeAt((i / 2) % key.length);
        decoded += String.fromCharCode(charCode);
    }
    return decoded;
}

/**
 * Generate order ID with encoded customer data.
 * Format: FK-{encoded_data}-{random}
 * The encoded data contains: productId|phone
 */
export function generateOrderId(productId: string, phone: string): string {
    const data = `${productId}|${phone}`;
    const encoded = simpleEncode(data);
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `FK${rand}${encoded}`;
}

/**
 * Parse order ID to extract product ID and phone.
 */
export function parseOrderId(orderId: string): { productId: string; phone: string } | null {
    try {
        if (!orderId.startsWith("FK") || orderId.length < 10) return null;

        // Remove FK prefix and 4-char random
        const encoded = orderId.substring(6);
        const decoded = simpleDecode(encoded);

        if (!decoded.includes("|")) return null;

        const [productId, phone] = decoded.split("|");

        if (!productId || !phone || phone.length < 10) return null;

        return { productId, phone };
    } catch {
        return null;
    }
}
