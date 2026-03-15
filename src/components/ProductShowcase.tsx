"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const showcaseImages = [
    {
        src: "/1.webp",
        alt: "Template Bisnis Premium - Dashboard & Fitur Lengkap",
    },
    {
        src: "/2.webp",
        alt: "Ultimate Business Management - Koleksi Tools Bisnis",
    },
    {
        src: "/3.webp",
        alt: "Smart Finance - Pencatatan Keuangan Akurat",
    },
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -400 : 400,
        opacity: 0,
        scale: 0.95,
    }),
};

export default function ProductShowcase() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);

    const paginate = useCallback(
        (newDirection: number) => {
            const nextIndex =
                (current + newDirection + showcaseImages.length) %
                showcaseImages.length;
            setCurrent([nextIndex, newDirection]);
        },
        [current]
    );

    // Auto-play
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [current, isHovered, paginate]);

    const goToSlide = (index: number) => {
        const dir = index > current ? 1 : -1;
        setCurrent([index, dir]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
        >
            <div
                className="showcase-container relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Main Image Area */}
                <div className="showcase-wrapper glass-card rounded-2xl overflow-hidden relative">
                    {/* Decorative glow behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-rose-500/10 to-indigo-500/20 rounded-2xl blur-xl opacity-60 -z-10" />

                    {/* Image container */}
                    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 },
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={showcaseImages[current].src}
                                    alt={showcaseImages[current].alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                                    priority={current === 0}
                                />
                                {/* Subtle gradient overlay for blending */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/40 via-transparent to-[#0a0a1a]/20 pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation arrows */}
                        <button
                            onClick={() => paginate(-1)}
                            className="showcase-arrow absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <HiChevronLeft className="text-xl sm:text-2xl" />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="showcase-arrow absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                        >
                            <HiChevronRight className="text-xl sm:text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    {showcaseImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`showcase-dot relative transition-all duration-400 rounded-full ${
                                index === current
                                    ? "w-8 h-3 bg-gradient-to-r from-indigo-500 to-rose-500"
                                    : "w-3 h-3 bg-slate-600 hover:bg-slate-400"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {index === current && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Image caption */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={current}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-center text-slate-400 text-sm mt-3"
                    >
                        {showcaseImages[current].alt}
                    </motion.p>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
