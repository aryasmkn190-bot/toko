"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id") || "";

    return (
        <main className="min-h-screen animated-bg grid-pattern flex items-center justify-center px-4">
            <div className="relative z-10 glass-card rounded-2xl p-8 sm:p-12 text-center max-w-md w-full">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <HiCheckCircle className="text-5xl text-emerald-400" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Pembayaran Berhasil! 🎉
                </h1>

                {orderId && (
                    <p className="text-slate-400 text-sm mb-2">
                        Order ID: <span className="font-mono text-white">{orderId}</span>
                    </p>
                )}

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Terima kasih atas pembelian Anda! Link akses produk telah dikirim ke
                    WhatsApp Anda. Silakan cek pesan masuk dari FinanceKit.
                </p>

                <div className="glass rounded-xl p-4 mb-8 text-left">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
                        <FaWhatsapp className="text-lg" />
                        Cek WhatsApp Anda
                    </div>
                    <p className="text-xs text-slate-400">
                        Kami telah mengirimkan link akses produk beserta panduan penggunaan
                        ke nomor WhatsApp yang Anda daftarkan.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="btn-primary !py-3 rounded-xl text-center"
                    >
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="#products"
                        className="glass py-3 px-6 rounded-xl text-sm text-slate-300 hover:text-white transition-colors text-center"
                    >
                        Lihat Produk Lainnya
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen animated-bg grid-pattern flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                </main>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
