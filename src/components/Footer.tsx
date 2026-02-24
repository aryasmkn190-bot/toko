"use client";

import { motion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-8">
            <div className="section-divider mb-16" />

            {/* CTA Banner */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5" />
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                            Siap Optimalkan Keuangan{" "}
                            <span className="gradient-text">Bisnis Anda?</span>
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Bergabung dengan ribuan pebisnis yang sudah merasakan manfaatnya.
                            Dapatkan template premium sekarang!
                        </p>
                        <a
                            href="#products"
                            className="btn-accent text-lg !py-4 !px-8 rounded-xl inline-flex items-center gap-2"
                        >
                            🚀 Mulai Sekarang
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                <img
                                    src="/logo-header.png"
                                    alt="FinanceKit Icon"
                                    className="w-full h-full object-contain scale-[1.35] md:scale-[1.4]"
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Finance<span className="text-indigo-400">Kit</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
                            Koleksi template keuangan premium berbasis Google Spreadsheet
                            untuk membantu bisnis Anda tumbuh lebih efisien.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                            >
                                <FaWhatsapp />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                            >
                                <HiMail />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm text-white mb-4">Produk</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#products"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Template Keuangan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#products"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Template Keuangan + Pricing Tools
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#products"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Paket Lengkap Bisnis
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="font-semibold text-sm text-white mb-4">
                            Informasi
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#features"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Fitur
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#testimonials"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Testimoni
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#faq"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Kebijakan Privasi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Syarat & Ketentuan
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Copyright &copy; {currentYear} FinanceKit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
