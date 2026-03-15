import { NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/evolution-api";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, product, message } = body;

        if (!name || !phone || !product || !message) {
            return NextResponse.json(
                { error: "Semua kolom wajib diisi" },
                { status: 400 }
            );
        }

        // Evolution API mengharuskan format nomor dengan kode negara (62 untuk Indonesia)
        const adminPhone = "6285700009996";

        const formattedDate = new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
        });

        const waMessage = `🔔 *Pertanyaan Baru dari Website!*

👤 *Nama:* ${name}
📱 *WhatsApp:* ${phone}
🛍️ *Tertarik pada:* ${product}

❓ *Pertanyaan:*
${message}

⏰ ${formattedDate}`;

        const success = await sendWhatsAppMessage(adminPhone, waMessage);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: "Gagal mengirim pesan" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan internal server" },
            { status: 500 }
        );
    }
}
