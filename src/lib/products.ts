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
        id: "prod-001",
        name: "Template Laporan Keuangan",
        slug: "template-laporan-keuangan",
        description: "Template lengkap untuk pencatatan dan pelaporan keuangan bisnis secara otomatis.",
        longDescription: "Template Google Spreadsheet yang dirancang khusus untuk membantu Anda mencatat seluruh transaksi keuangan bisnis dengan mudah. Dilengkapi dengan dashboard otomatis, laporan laba rugi, neraca, dan arus kas yang dihasilkan secara real-time.",
        price: 149000,
        originalPrice: 299000,
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
        id: "prod-002",
        name: "Template Budgeting & Cashflow",
        slug: "template-budgeting-cashflow",
        description: "Kelola anggaran dan arus kas bisnis Anda secara profesional dan terstruktur.",
        longDescription: "Template perencanaan anggaran dan monitoring cashflow yang membantu Anda merencanakan keuangan bisnis dengan presisi. Fitur peringatan otomatis ketika pengeluaran mendekati batas anggaran.",
        price: 129000,
        originalPrice: 249000,
        features: [
            "Perencanaan anggaran bulanan",
            "Monitoring cashflow real-time",
            "Alert otomatis batas anggaran",
            "Perbandingan budget vs aktual",
            "Kategori pengeluaran customizable",
            "Proyeksi cashflow 12 bulan",
            "Export laporan PDF-ready",
            "Formula otomatis"
        ],
        category: "Budgeting",
        icon: "💰",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: "prod-003",
        name: "Template Invoice & Faktur",
        slug: "template-invoice-faktur",
        description: "Buat invoice profesional dan kelola faktur dengan tracking pembayaran otomatis.",
        longDescription: "Sistem invoicing lengkap berbasis Google Spreadsheet. Buat invoice profesional dalam hitungan detik, tracking status pembayaran, dan reminder otomatis untuk invoice yang overdue.",
        price: 99000,
        originalPrice: 199000,
        features: [
            "Generator invoice otomatis",
            "Desain invoice profesional",
            "Tracking status pembayaran",
            "Reminder overdue otomatis",
            "Database pelanggan",
            "Rekap pendapatan bulanan",
            "Nomor invoice auto-generate",
            "Multi-mata uang"
        ],
        category: "Invoice",
        icon: "🧾",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        id: "prod-004",
        name: "Template Manajemen Stok",
        slug: "template-manajemen-stok",
        description: "Kontrol inventori dan stok barang dengan sistem tracking yang akurat dan efisien.",
        longDescription: "Template manajemen inventori yang powerful untuk mengelola stok barang Anda. Dilengkapi fitur alert stok minimum, tracking pergerakan barang, dan laporan inventori yang komprehensif.",
        price: 119000,
        originalPrice: 229000,
        features: [
            "Tracking stok real-time",
            "Alert stok minimum",
            "Laporan pergerakan barang",
            "Kategori & SKU management",
            "Valuasi inventori otomatis",
            "Barcode-ready database",
            "Multi-gudang support",
            "Rekap stok opname"
        ],
        category: "Inventori",
        icon: "📦",
        gradient: "from-amber-500 to-orange-600",
    },
    {
        id: "prod-005",
        name: "Ultimate Business Bundle",
        slug: "ultimate-business-bundle",
        description: "Paket lengkap semua template keuangan premium untuk manajemen bisnis all-in-one.",
        longDescription: "Dapatkan SEMUA template premium dalam satu paket hemat! Termasuk Template Laporan Keuangan, Budgeting & Cashflow, Invoice & Faktur, dan Manajemen Stok. Solusi lengkap untuk manajemen bisnis Anda.",
        price: 349000,
        originalPrice: 799000,
        features: [
            "✅ Template Laporan Keuangan",
            "✅ Template Budgeting & Cashflow",
            "✅ Template Invoice & Faktur",
            "✅ Template Manajemen Stok",
            "Akses lifetime",
            "Update gratis selamanya",
            "Bonus: Template KPI Karyawan",
            "Bonus: Template Analisis Break-even",
            "Support prioritas via WhatsApp",
            "Kolaborasi hingga 50 orang"
        ],
        category: "Bundle",
        badge: "Hemat 56%",
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

export function generateOrderId(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `INV${dateStr}${rand}`;
}
