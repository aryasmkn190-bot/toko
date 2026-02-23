"use client";

import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import { HiClipboardCopy, HiCheckCircle, HiClock } from "react-icons/hi";

function PaymentContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const orderId = params.orderId as string;

    const method = searchParams.get("method") || "qris";
    const paymentNumber = searchParams.get("number") || "";
    const totalPayment = parseInt(searchParams.get("total") || "0");
    const expiredAt = searchParams.get("expired") || "";

    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<string>("pending");
    const [timeLeft, setTimeLeft] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    // Generate QR code for QRIS
    useEffect(() => {
        if (method === "qris" && paymentNumber) {
            import("qrcode").then((QRCode) => {
                QRCode.toDataURL(paymentNumber, {
                    width: 280,
                    margin: 2,
                    color: {
                        dark: "#000000",
                        light: "#ffffff",
                    },
                }).then(setQrDataUrl);
            });
        }
    }, [method, paymentNumber]);

    // Countdown timer
    useEffect(() => {
        if (!expiredAt) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const expired = new Date(expiredAt).getTime();
            const diff = expired - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(interval);
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    // Poll order status
    const checkStatus = useCallback(async () => {
        try {
            const res = await fetch(`/api/order/status?order_id=${orderId}`);
            if (res.ok) {
                const data = await res.json();
                setStatus(data.status);
            }
        } catch {
            // Ignore errors
        }
    }, [orderId]);

    useEffect(() => {
        const interval = setInterval(checkStatus, 5000);
        return () => clearInterval(interval);
    }, [checkStatus]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(paymentNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (status === "completed") {
        return (
            <main className="min-h-screen animated-bg grid-pattern flex items-center justify-center px-4">
                <div className="relative z-10 glass-card rounded-2xl p-8 sm:p-12 text-center max-w-md w-full">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <HiCheckCircle className="text-5xl text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white mb-3">
                        Pembayaran Berhasil! 🎉
                    </h1>
                    <p className="text-slate-400 mb-2">Order ID: {orderId}</p>
                    <p className="text-slate-400 text-sm mb-8">
                        Link produk telah dikirim ke WhatsApp Anda. Silakan cek pesan
                        masuk dari FinanceKit.
                    </p>
                    <Link
                        href="/"
                        className="btn-primary !py-3 !px-6 rounded-xl inline-block"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen animated-bg grid-pattern">
            <div className="relative z-10 max-w-lg mx-auto px-4 py-8 sm:py-16">
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                            Menunggu Pembayaran
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Order ID: <span className="text-white font-mono">{orderId}</span>
                        </p>
                    </div>

                    {/* Timer */}
                    {timeLeft && (
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <HiClock className="text-amber-400" />
                            <span
                                className={`font-mono font-bold text-lg ${timeLeft === "Expired" ? "text-red-400" : "text-amber-400"
                                    }`}
                            >
                                {timeLeft}
                            </span>
                        </div>
                    )}

                    {/* QR Code for QRIS */}
                    {method === "qris" && qrDataUrl && (
                        <div className="bg-white rounded-2xl p-6 mx-auto w-fit mb-6">
                            <img
                                src={qrDataUrl}
                                alt="QRIS Payment QR Code"
                                className="w-64 h-64"
                            />
                        </div>
                    )}

                    {/* VA Number */}
                    {method !== "qris" && paymentNumber && (
                        <div className="mb-6">
                            <label className="block text-sm text-slate-400 mb-2">
                                Nomor Virtual Account ({method.replace("_va", "").toUpperCase()})
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-white text-lg tracking-wider">
                                    {paymentNumber}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-3 rounded-xl glass hover:bg-white/10 transition-all"
                                    title="Copy"
                                >
                                    {copied ? (
                                        <HiCheckCircle className="text-emerald-400 text-xl" />
                                    ) : (
                                        <HiClipboardCopy className="text-slate-400 text-xl" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Total */}
                    <div className="glass rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Total Pembayaran</span>
                            <span className="text-xl font-extrabold gradient-text">
                                {formatPrice(totalPayment)}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            Termasuk biaya layanan
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-white mb-3">
                            Cara Pembayaran:
                        </h3>
                        {method === "qris" ? (
                            <ol className="text-sm text-slate-400 space-y-2">
                                <li>1. Buka aplikasi e-wallet atau mobile banking Anda</li>
                                <li>2. Pilih menu &quot;Scan QR&quot; atau &quot;QRIS&quot;</li>
                                <li>3. Scan QR code di atas</li>
                                <li>4. Konfirmasi pembayaran</li>
                                <li>5. Produk akan dikirim otomatis via WhatsApp</li>
                            </ol>
                        ) : (
                            <ol className="text-sm text-slate-400 space-y-2">
                                <li>1. Buka aplikasi mobile banking Anda</li>
                                <li>2. Pilih menu Transfer &gt; Virtual Account</li>
                                <li>3. Masukkan nomor VA di atas</li>
                                <li>4. Konfirmasi pembayaran</li>
                                <li>5. Produk akan dikirim otomatis via WhatsApp</li>
                            </ol>
                        )}
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Menunggu pembayaran...
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen animated-bg grid-pattern flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                </main>
            }
        >
            <PaymentContent />
        </Suspense>
    );
}
