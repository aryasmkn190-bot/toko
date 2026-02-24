"use client";

import { motion } from "framer-motion";
import { products, formatPrice } from "@/lib/products";
import { HiCheck, HiShoppingCart } from "react-icons/hi";
import Link from "next/link";

export default function ProductsSection() {
    return (
        <section id="products" className="relative py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Koleksi Template
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-5">
                        Produk <span className="gradient-text">Premium</span> Kami
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Pilih template yang sesuai kebutuhan bisnis Anda, atau dapatkan
                        semua dengan harga spesial di paket bundle.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`glass-card rounded-2xl overflow-hidden flex flex-col ${product.popular
                                ? "ring-2 ring-indigo-500/50 md:col-span-1 lg:col-span-1"
                                : ""
                                } ${product.id === "prod-005"
                                    ? "md:col-span-2 lg:col-span-3"
                                    : ""
                                }`}
                        >
                            {/* Card Header */}
                            <div
                                className={`p-6 pb-4 relative ${product.id === "prod-005" ? "lg:text-center" : ""
                                    }`}
                            >
                                {product.badge && (
                                    <span
                                        className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${product.badge.includes("Best Seller")
                                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                            : product.badge.includes("Best Value")
                                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                            }`}
                                    >
                                        {product.badge}
                                    </span>
                                )}

                                <div
                                    className={`text-4xl mb-3 ${product.id === "prod-005" ? "text-5xl" : ""
                                        }`}
                                >
                                    {product.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div
                                className={`px-6 pb-4 ${product.id === "prod-005" ? "lg:text-center" : ""
                                    }`}
                            >
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <span
                                        className={`text-3xl font-extrabold ${product.id === "prod-005"
                                            ? "gradient-text"
                                            : "text-white"
                                            }`}
                                    >
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-slate-500 line-through text-sm">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                        Hemat{" "}
                                        {Math.round(
                                            ((product.originalPrice - product.price) /
                                                product.originalPrice) *
                                            100
                                        )}
                                        %
                                    </span>
                                </div>
                            </div>

                            {/* Features */}
                            <div
                                className={`px-6 pb-4 flex-1 ${product.id === "prod-005"
                                    ? "lg:grid lg:grid-cols-2 lg:gap-x-8"
                                    : ""
                                    }`}
                            >
                                {product.features.map((feature, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 py-1.5 text-sm text-slate-300"
                                    >
                                        <HiCheck className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="p-6 pt-2">
                                <Link
                                    href={`/checkout/${product.slug}`}
                                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all ${product.id === "prod-005"
                                        ? "btn-accent"
                                        : "btn-primary"
                                        }`}
                                >
                                    <HiShoppingCart />
                                    Beli Sekarang
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
