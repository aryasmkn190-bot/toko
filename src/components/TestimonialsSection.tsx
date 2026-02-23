"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
    {
        name: "Rina Pratiwi",
        role: "Owner, Toko Roti Makmur",
        text: "Template laporan keuangannya sangat membantu! Sekarang saya bisa lihat profit bisnis real-time tanpa harus pusing hitung manual. Worth it banget!",
        rating: 5,
        avatar: "RP",
    },
    {
        name: "Ahmad Fauzi",
        role: "Freelancer & Konsultan",
        text: "Invoice generator-nya keren! Klien saya langsung impressed lihat invoice yang profesional. Tracking pembayaran juga jadi gampang.",
        rating: 5,
        avatar: "AF",
    },
    {
        name: "Dewi Lestari",
        role: "Manager, CV Berkah Jaya",
        text: "Beli bundle-nya dan gak nyesel. Semua template saling terintegrasi. Tim saya juga bisa akses bareng. Super recommended!",
        rating: 5,
        avatar: "DL",
    },
    {
        name: "Budi Santoso",
        role: "Owner, Warung Makan Sederhana",
        text: "Awalnya skeptis karena cuma Google Sheet, tapi setelah pakai langsung amazed. Budgeting jadi terstruktur, cashflow terkontrol.",
        rating: 5,
        avatar: "BS",
    },
    {
        name: "Sari Indah",
        role: "CEO, PT Digital Kreatif",
        text: "Template manajemen stok menyelamatkan bisnis kami! Dulu sering salah hitung stok, sekarang semuanya akurat dan ada alert otomatis.",
        rating: 5,
        avatar: "SI",
    },
    {
        name: "Hendro Wijaya",
        role: "Owner, Toko Online Fashion",
        text: "Harga sangat terjangkau untuk kualitas premium. Support via WhatsApp juga fast response. Terima kasih FinanceKit!",
        rating: 5,
        avatar: "HW",
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative py-24 sm:py-32">
            <div className="section-divider mb-24" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Apa Kata Mereka
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-5">
                        Dipercaya <span className="gradient-text">Ribuan</span> Pebisnis
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Bergabung dengan 2,500+ pebisnis yang sudah mengoptimalkan
                        keuangan mereka dengan template kami.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <HiStar key={i} className="text-amber-400 text-lg" />
                                ))}
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        {t.name}
                                    </div>
                                    <div className="text-xs text-slate-400">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
