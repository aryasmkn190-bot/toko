export async function sendWhatsAppMessage(
    phoneNumber: string,
    message: string
): Promise<boolean> {
    const baseUrl = process.env.EVOLUTION_API_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;
    const instanceName = process.env.EVOLUTION_INSTANCE_NAME;

    if (!baseUrl || !apiKey || !instanceName) {
        console.error("Evolution API configuration missing");
        return false;
    }

    // Format phone number - ensure it starts with country code
    const formattedNumber = phoneNumber.replace(/[^0-9]/g, "");

    try {
        const res = await fetch(
            `${baseUrl}/message/sendText/${instanceName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apikey: apiKey,
                },
                body: JSON.stringify({
                    number: formattedNumber,
                    text: message,
                }),
            }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error(`Evolution API error: ${res.status} - ${text}`);
            return false;
        }

        console.log(`WhatsApp message sent to ${formattedNumber}`);
        return true;
    } catch (error) {
        console.error("Failed to send WhatsApp message:", error);
        return false;
    }
}

export function buildPurchaseMessage(
    customerName: string,
    productName: string,
    orderId: string,
    productLink: string
): string {
    return `✅ *Pembayaran Berhasil!*

Halo ${customerName},

Terima kasih atas pembelian Anda! Berikut detail pesanan:

🛍️ *Produk:* ${productName}
📋 *Order ID:* ${orderId}

🔗 *Link Akses Produk:*
${productLink}

📌 *Petunjuk Penggunaan:*
1. Klik link di atas
2. Login ke akun Google Anda
3. Klik "Buat salinan" untuk menyalin template ke Google Drive Anda
4. Mulai gunakan template!

⚠️ *Penting:* Link ini bersifat pribadi, mohon jangan dibagikan ke orang lain.

Jika ada kendala, silakan hubungi kami.

Terima kasih! 🙏
_FinanceKit - Template Keuangan Premium_`;
}

export function buildAdminNotification(
    customerName: string,
    customerPhone: string,
    productName: string,
    orderId: string,
    amount: number,
    paymentMethod: string
): string {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);

    return `🔔 *Penjualan Baru!*

👤 *Pelanggan:* ${customerName}
📱 *WhatsApp:* ${customerPhone}
🛍️ *Produk:* ${productName}
📋 *Order ID:* ${orderId}
💰 *Nominal:* ${formattedAmount}
💳 *Metode:* ${paymentMethod.toUpperCase()}

⏰ ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`;
}
