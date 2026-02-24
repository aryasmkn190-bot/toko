export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice: number;
    features: string[];
    category: string;
    badge?: string;
    icon: string;
    gradient: string;
    popular?: boolean;
}

export const products: Product[] = [
    {
        id: "P01",
        name: "Template Keuangan",
        slug: "template-keuangan",
        description: "Template lengkap untuk pencatatan dan pelaporan keuangan bisnis secara otomatis.",
        longDescription: "Template Google Spreadsheet yang dirancang khusus untuk membantu Anda mencatat seluruh transaksi keuangan bisnis dengan mudah. Dilengkapi dengan dashboard otomatis, laporan laba rugi, neraca, dan arus kas yang dihasilkan secara real-time.",
        price: 39000,
        originalPrice: 79000,
        features: [
            "Dashboard keuangan otomatis",
            "Laporan Laba Rugi real-time",
            "Neraca Keuangan otomatis",
            "Laporan Arus Kas",
            "Pencatatan pemasukan & pengeluaran",
            "Grafik & chart visual",
            "Multi-periode (bulanan & tahunan)",
            "Template siap pakai",
        ],
        category: "Keuangan",
        badge: "Best Seller",
        icon: "📊",
        gradient: "from-emerald-500 to-teal-600",
        popular: true,
    },
    {
        id: "P02",
        name: "Template Keuangan + Pricing Tools",
        slug: "template-keuangan-pricing-tools",
        description: "Paket template keuangan lengkap dilengkapi Kalkulator HPP untuk menentukan harga jual optimal.",
        longDescription: "Gabungan Template Keuangan dan Pricing Tools (Kalkulator HPP) dalam satu paket. Kelola keuangan bisnis sekaligus hitung Harga Pokok Produksi dengan akurat. Dilengkapi analisis margin keuntungan dan simulasi harga jual.",
        price: 79000,
        originalPrice: 149000,
        features: [
            "✅ Template Keuangan Lengkap",
            "✅ Kalkulator HPP Otomatis",
            "Dashboard keuangan otomatis",
            "Laporan Laba Rugi real-time",
            "Analisis margin keuntungan",
            "Simulasi harga jual",
            "Perhitungan biaya bahan baku",
            "Perhitungan biaya tenaga kerja & overhead",
        ],
        category: "Paket",
        icon: "🧮",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: "P03",
        name: "Paket Lengkap Bisnis",
        slug: "paket-lengkap-bisnis",
        description: "Paket ALL-IN-ONE: Template Keuangan, Pricing Tools, Inventory Tracker, Invoice, dan Ebook.",
        longDescription: "Dapatkan SEMUA template premium dalam satu paket super hemat! Termasuk Template Keuangan, Pricing Tools (Kalkulator HPP), Inventory Tracker, Invoice, dan bonus Ebook strategi bisnis. Solusi lengkap untuk manajemen bisnis Anda.",
        price: 99000,
        originalPrice: 249000,
        features: [
            "✅ Template Keuangan Lengkap",
            "✅ Pricing Tools (Kalkulator HPP)",
            "✅ Inventory Tracker (Manajemen Stok)",
            "✅ Template Invoice & Faktur",
            "✅ Ebook Strategi Bisnis",
            "Akses lifetime",
            "Update gratis selamanya",
            "Support prioritas via WhatsApp",
        ],
        category: "Bundle",
        badge: "Best Value · Hemat 60%",
        icon: "🚀",
        gradient: "from-rose-500 to-pink-600",
        popular: true,
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}
