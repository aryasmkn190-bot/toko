"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { products, formatPrice } from "@/lib/products";
import { HiCheck, HiShoppingCart } from "react-icons/hi";
import Link from "next/link";
import ProductShowcase from "./ProductShowcase";

function ProductCard({ product }: { product: (typeof products)[0] }) {
    return (
        <div
            className={`glass-card rounded-2xl overflow-hidden flex flex-col h-full ${
                product.popular
                    ? "ring-2 ring-indigo-500/50"
                    : ""
            }`}
        >
            {/* Card Header */}
            <div className="p-6 pb-4 relative">
                {product.badge && (
                    <span
                        className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                            product.badge.includes("Best Seller")
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : product.badge.includes("Best Value")
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                    >
                        {product.badge}
                    </span>
                )}

                <div className="text-4xl mb-3">
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
            <div className="px-6 pb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl font-extrabold text-white">
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
            <div className="px-6 pb-4 flex-1">
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
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all ${
                        product.id === "prod-005"
                            ? "btn-accent"
                            : "btn-primary"
                    }`}
                >
                    <HiShoppingCart />
                    Beli Sekarang
                </Link>
            </div>
        </div>
    );
}

export default function ProductsSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);

    // Handle scroll snap detection
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            if (isScrollingRef.current) return;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollLeft = container.scrollLeft;
                // New math to determine scroll index based on snap-center setup
                const cardWidth = (container.children[0] as HTMLElement).offsetWidth + 16;
                // Add half width to account for snap-center offset behavior when calculating current slide
                const index = Math.round((scrollLeft + (container.offsetWidth - cardWidth)/2) / cardWidth);
                setActiveSlide(Math.min(index, products.length - 1));
            }, 50);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    const scrollToSlide = (index: number) => {
        const container = scrollRef.current;
        if (!container) return;

        isScrollingRef.current = true;
        // Add offset math to place the target slide in the center of the container
        const cardWidth = (container.children[0] as HTMLElement).offsetWidth + 16;
        const scrollOffset = (container.offsetWidth - cardWidth) / 2;
        container.scrollTo({
            left: (cardWidth * index) - scrollOffset,
            behavior: "smooth",
        });

        setActiveSlide(index);
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 400);
    };

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

                {/* Product Showcase Carousel */}
                <ProductShowcase />

                {/* Desktop Grid (md+) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`${
                                product.id === "prod-005"
                                    ? "md:col-span-2 lg:col-span-3"
                                    : ""
                            }`}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel (below md) */}
                <div className="md:hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div
                            ref={scrollRef}
                            className="products-carousel flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 snap-always"
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="products-carousel-card flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] snap-center"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Dot indicators */}
                        <div className="flex items-center justify-center gap-2.5 mt-5">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToSlide(index)}
                                    className={`products-carousel-dot transition-all duration-300 rounded-full ${
                                        index === activeSlide
                                            ? "w-7 h-2.5 bg-gradient-to-r from-indigo-500 to-rose-500"
                                            : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
                                    }`}
                                    aria-label={`Lihat produk ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Swipe hint */}
                        <p className="text-center text-slate-500 text-xs mt-3">
                            ← Geser untuk melihat produk lainnya →
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
