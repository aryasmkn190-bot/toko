"use client";

import { motion } from "framer-motion";
import { HiArrowDown, HiStar } from "react-icons/hi";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center animated-bg grid-pattern overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-8"
                >
                    <HiStar className="text-amber-400" />
                    <span>Template Premium Terpercaya #1 di Indonesia</span>
                    <HiStar className="text-amber-400" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                >
                    Kelola Keuangan Bisnis
                    <br />
                    <span className="gradient-text">Lebih Cerdas & Efisien</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    Koleksi template{" "}
                    <span className="text-white font-medium">Google Spreadsheet</span>{" "}
                    premium yang dirancang khusus untuk membantu bisnis Anda mencatat,
                    menganalisis, dan mengoptimalkan keuangan secara{" "}
                    <span className="text-emerald-400 font-medium">otomatis</span>.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <a
                        href="#products"
                        className="btn-accent text-lg !py-4 !px-8 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        🛒 Lihat Produk
                    </a>
                    <a
                        href="#features"
                        className="glass text-lg font-semibold py-4 px-8 rounded-xl text-slate-300 hover:text-white transition-all hover:border-white/20 w-full sm:w-auto text-center"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
                >
                    {[
                        { value: "2,500+", label: "Pengguna Aktif" },
                        { value: "4.9/5", label: "Rating" },
                        { value: "50+", label: "Template" },
                        { value: "100%", label: "Akses Lifetime" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card rounded-xl p-4">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <HiArrowDown className="text-2xl text-slate-500 animate-bounce" />
                </motion.div>
            </div>

            {/* Decorative orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "1.5s" }}
            />
            <div
                className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "3s" }}
            />
        </section>
    );
}
