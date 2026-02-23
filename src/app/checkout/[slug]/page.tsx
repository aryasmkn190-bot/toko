"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products, formatPrice, type Product } from "@/lib/products";
import Link from "next/link";
import {
    HiArrowLeft,
    HiCheck,
    HiShieldCheck,
    HiLockClosed,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const paymentMethods = [
    {
        id: "qris",
        name: "QRIS",
        desc: "Scan QR - Semua e-wallet & bank",
        icon: "📱",
    },
    { id: "bri_va", name: "BRI VA", desc: "Virtual Account BRI", icon: "🏦" },
    { id: "bni_va", name: "BNI VA", desc: "Virtual Account BNI", icon: "🏦" },
    {
        id: "permata_va",
        name: "Permata VA",
        desc: "Virtual Account Permata",
        icon: "🏦",
    },
    {
        id: "cimb_niaga_va",
        name: "CIMB Niaga VA",
        desc: "Virtual Account CIMB",
        icon: "🏦",
    },
    {
        id: "url",
        name: "Metode Lainnya",
        desc: "Pilih di halaman pembayaran",
        icon: "💳",
    },
];

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const product = products.find((p) => p.slug === slug);

    const [form, setForm] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        paymentMethod: "qris",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
                    <Link href="/" className="text-indigo-400 hover:underline">
                        Kembali ke beranda
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validate phone number
            const phone = form.customerPhone.replace(/[^0-9]/g, "");
            if (phone.length < 10) {
                setError("Nomor WhatsApp tidak valid");
                setLoading(false);
                return;
            }

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    customerName: form.customerName,
                    customerPhone: phone.startsWith("0") ? "62" + phone.slice(1) : phone,
                    customerEmail: form.customerEmail,
                    paymentMethod: form.paymentMethod,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Terjadi kesalahan");
            }

            if (data.method === "url" && data.paymentUrl) {
                // Redirect to Pakasir payment page
                window.location.href = data.paymentUrl;
            } else {
                // Show payment details page
                router.push(
                    `/payment/${data.orderId}?method=${data.payment.payment_method}&number=${encodeURIComponent(data.payment.payment_number)}&total=${data.payment.total_payment}&expired=${encodeURIComponent(data.payment.expired_at)}`
                );
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Terjadi kesalahan"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen animated-bg grid-pattern">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm"
                >
                    <HiArrowLeft />
                    Kembali ke beranda
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="glass-card rounded-2xl p-6 sm:p-8 sticky top-24">
                            <div className="text-4xl mb-4">{product.icon}</div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                                {product.name}
                            </h1>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                {product.longDescription}
                            </p>

                            {/* Price */}
                            <div className="glass rounded-xl p-4 mb-6">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-3xl font-extrabold gradient-text">
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-slate-500 line-through text-sm">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                </div>
                                <span className="text-xs text-emerald-400 font-semibold">
                                    🔥 Hemat{" "}
                                    {formatPrice(product.originalPrice - product.price)}
                                </span>
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                {product.features.map((f, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-slate-300"
                                    >
                                        <HiCheck className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Trust badges */}
                            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <HiShieldCheck className="text-emerald-400 text-lg" />
                                    Pembayaran Aman
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <HiLockClosed className="text-indigo-400 text-lg" />
                                    Data Terproteksi
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <FaWhatsapp className="text-green-400 text-lg" />
                                    Kirim via WhatsApp
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    ⚡ Akses Instan
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Checkout Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="glass-card rounded-2xl p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-white mb-6">
                                Informasi Pembeli
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.customerName}
                                        onChange={(e) =>
                                            setForm({ ...form, customerName: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Nomor WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={form.customerPhone}
                                        onChange={(e) =>
                                            setForm({ ...form, customerPhone: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                        placeholder="08123456789"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Link produk akan dikirim ke WhatsApp ini
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.customerEmail}
                                        onChange={(e) =>
                                            setForm({ ...form, customerEmail: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-3">
                                        Metode Pembayaran
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {paymentMethods.map((pm) => (
                                            <button
                                                key={pm.id}
                                                type="button"
                                                onClick={() =>
                                                    setForm({ ...form, paymentMethod: pm.id })
                                                }
                                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left text-sm ${form.paymentMethod === pm.id
                                                    ? "border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/30"
                                                    : "border-white/10 bg-white/5 hover:border-white/20"
                                                    }`}
                                            >
                                                <span className="text-xl">{pm.icon}</span>
                                                <div>
                                                    <div className="font-medium text-white text-sm">
                                                        {pm.name}
                                                    </div>
                                                    <div className="text-xs text-slate-400">
                                                        {pm.desc}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-accent !py-4 text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            🔒 Bayar {formatPrice(product.price)}
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-slate-500 text-center">
                                    Dengan melakukan pembayaran, Anda menyetujui syarat &
                                    ketentuan yang berlaku.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
