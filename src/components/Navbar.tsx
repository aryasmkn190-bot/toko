"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#0a0a1a] ${scrolled
                ? "py-3 shadow-lg shadow-black/30 border-b border-white/5"
                : "py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/logo-all.png"
                            alt="FinanceKit Logo"
                            className="h-28 md:h-36 w-auto object-contain -mt-8 -mb-12 md:-mt-11 md:-mb-17 transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#products"
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Produk
                        </a>
                        <a
                            href="#features"
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Fitur
                        </a>
                        <a
                            href="#testimonials"
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Testimonial
                        </a>
                        <a
                            href="#faq"
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="#products"
                            className="btn-primary text-sm !py-2.5 !px-5 rounded-lg"
                        >
                            Beli Sekarang
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-2xl text-slate-300"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {menuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-4">
                        <a
                            href="#products"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Produk
                        </a>
                        <a
                            href="#features"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Fitur
                        </a>
                        <a
                            href="#testimonials"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            Testimonial
                        </a>
                        <a
                            href="#faq"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="#products"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary text-sm !py-2.5 text-center rounded-lg"
                        >
                            Beli Sekarang
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}
