"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi";
import { products } from "@/lib/products";

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            product: formData.get("product"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Gagal mengirim pesan");
            }

            setIsSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
            }, 3000);
        } catch (err: any) {
            setErrorMsg(err.message || "Terjadi kesalahan koneksi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                        className="mb-4 w-80 overflow-hidden rounded-2xl border border-white/10 shadow-2xl glass-card backdrop-blur-2xl"
                    >
                        {/* Header */}
                        <div className="bg-emerald-500/10 px-6 py-4 border-b border-emerald-500/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                    <FaWhatsapp size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Customer Support</h3>
                                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors p-1"
                                aria-label="Tutup form"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaWhatsapp className="text-emerald-500 text-3xl" />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">Pesan Terkirim!</h4>
                                    <p className="text-slate-400 text-sm">
                                        Terima kasih. Admin kami akan segera membalas pertanyaan Anda.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {errorMsg && (
                                        <div className="bg-rose-500/10 text-rose-400 text-xs px-3 py-2 rounded-lg border border-rose-500/20">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="name" className="block text-xs text-slate-400 mb-1">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
                                            placeholder="Masukkan nama"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-xs text-slate-400 mb-1">
                                            No WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
                                            placeholder="0812xxxxxx"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="product" className="block text-xs text-slate-400 mb-1">
                                            Pilih Produk Terkait
                                        </label>
                                        <select
                                            id="product"
                                            name="product"
                                            required
                                            disabled={isLoading}
                                            defaultValue=""
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-50 appearance-none bg-no-repeat"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                                backgroundPosition: "right 1rem center",
                                                backgroundSize: "1em"
                                            }}
                                        >
                                            <option value="" disabled className="text-slate-800">
                                                -- Pilih Produk --
                                            </option>
                                            <option value="Pertanyaan Umum" className="text-slate-800">
                                                Pertanyaan Umum (Bukan Produk)
                                            </option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.name} className="text-slate-800">
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs text-slate-400 mb-1">
                                            Pertanyaan
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            disabled={isLoading}
                                            rows={3}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none disabled:opacity-50"
                                            placeholder="Halo, saya ingin bertanya tentang..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            <>
                                                <HiPaperAirplane className="rotate-90" />
                                                Kirim Pesan
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow z-50 relative group"
                aria-label="Hubungi kami via WhatsApp"
            >
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border border-white/20"></span>
                    </span>
                )}
                
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaWhatsapp size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
