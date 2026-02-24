import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinanceKit - Template Keuangan Premium | Google Spreadsheet",
  description:
    "Koleksi template keuangan premium berbasis Google Spreadsheet untuk mengelola bisnis Anda. Template keuangan, pricing tools, inventory tracker, invoice, dan ebook.",
  keywords: [
    "template keuangan",
    "google spreadsheet",
    "laporan keuangan",
    "template bisnis",
    "pricing tools",
    "kalkulator hpp",
    "invoice",
    "manajemen stok",
  ],
  openGraph: {
    title: "FinanceKit - Template Keuangan Premium",
    description:
      "Koleksi template keuangan premium berbasis Google Spreadsheet untuk mengelola bisnis Anda.",
    type: "website",
  },
  icons: {
    icon: "/logo-all.png",
    apple: "/logo-all.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
