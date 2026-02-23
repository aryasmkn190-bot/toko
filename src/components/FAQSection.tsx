"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
    {
        q: "Apa itu FinanceKit?",
        a: "FinanceKit adalah koleksi template keuangan premium berbasis Google Spreadsheet yang dirancang untuk membantu bisnis Anda mengelola keuangan secara optimal, meningkatkan produktivitas kerja, dan menghasilkan profit maksimal.",
    },
    {
        q: "Menggunakan aplikasi apa?",
        a: "Semua template kami menggunakan Google Spreadsheet — aplikasi yang familiar dan mudah dioperasikan. Anda tidak perlu menginstal software tambahan.",
    },
    {
        q: "Apa kelebihan menggunakan Google Spreadsheet?",
        a: "• Kolaborasi secara real-time tanpa kirim file manual\n• Fleksibel, bisa kolaborasi hingga 50 orang\n• 100% aman, file tersimpan di Google Drive\n• Mudah digunakan, anti ribet\n• Bisa diakses dari semua perangkat",
    },
    {
        q: "Apakah bisa digunakan bersama tim?",
        a: "Tentu! Anda bisa menambahkan email anggota tim untuk berkolaborasi secara real-time. Mendukung hingga 50 orang dalam satu template.",
    },
    {
        q: "Bagaimana cara menerima produk setelah bayar?",
        a: "Setelah pembayaran berhasil, link akses produk akan dikirim langsung ke WhatsApp Anda secara otomatis. Anda tinggal klik link tersebut untuk mulai menggunakan template.",
    },
    {
        q: "Apakah produk bisa diakses selamanya?",
        a: "Ya! Semua produk kami memberikan akses lifetime. Sekali beli, Anda bisa menggunakannya selamanya tanpa biaya langganan.",
    },
    {
        q: "Apakah ada update template?",
        a: "Ya! Setiap update dan perbaikan template akan Anda dapatkan secara gratis tanpa biaya tambahan apapun.",
    },
    {
        q: "Apakah saya dapat mengajukan pengembalian dana?",
        a: "Mohon maaf, kami tidak menerima pengajuan pengembalian dana karena produk kami merupakan produk digital yang dapat diakses selamanya setelah pembelian.",
    },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass-card rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
                <span className="font-semibold text-white text-sm sm:text-base pr-4">
                    {faq.q}
                </span>
                <HiChevronDown
                    className={`text-indigo-400 text-xl flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-4">
                    {faq.a}
                </div>
            </div>
        </motion.div>
    );
}

export default function FAQSection() {
    return (
        <section id="faq" className="relative py-24 sm:py-32">
            <div className="section-divider mb-24" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Pertanyaan Umum
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-5">
                        Frequently Asked{" "}
                        <span className="gradient-text">Questions</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
