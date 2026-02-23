"use client";

import { motion } from "framer-motion";
import {
    HiLightningBolt,
    HiShieldCheck,
    HiRefresh,
    HiUserGroup,
    HiDeviceMobile,
    HiClock,
} from "react-icons/hi";

const features = [
    {
        icon: <HiLightningBolt className="text-2xl" />,
        title: "Otomatis & Efisien",
        description:
            "Formula dan dashboard yang bekerja otomatis. Cukup input data, laporan langsung jadi.",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        icon: <HiShieldCheck className="text-2xl" />,
        title: "100% Aman di Google Drive",
        description:
            "File tersimpan aman di Google Drive Anda. Tidak akan hilang dan bisa diakses kapan saja.",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        icon: <HiRefresh className="text-2xl" />,
        title: "Update Gratis Selamanya",
        description:
            "Setiap pembaruan template akan Anda dapatkan secara gratis tanpa biaya tambahan.",
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        icon: <HiUserGroup className="text-2xl" />,
        title: "Kolaborasi Tim",
        description:
            "Bisa digunakan bersama tim hingga 50 orang. Cukup tambahkan email anggota tim.",
        gradient: "from-violet-500 to-purple-500",
    },
    {
        icon: <HiDeviceMobile className="text-2xl" />,
        title: "Akses Multi-Device",
        description:
            "Buka di laptop, tablet, atau smartphone. Google Sheet mendukung semua perangkat.",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        icon: <HiClock className="text-2xl" />,
        title: "Akses Lifetime",
        description:
            "Sekali beli, akses selamanya. Tidak ada biaya langganan bulanan atau tahunan.",
        gradient: "from-cyan-500 to-blue-500",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 sm:py-32">
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
                        Kenapa Pilih Kami
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-5">
                        Fitur <span className="gradient-text">Unggulan</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Template kami dirancang dengan standar profesional untuk membantu
                        bisnis Anda berkembang.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="glass-card rounded-2xl p-6 group"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
