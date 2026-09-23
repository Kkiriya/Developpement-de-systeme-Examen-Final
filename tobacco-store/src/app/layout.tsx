import type { Metadata } from "next";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { LanguageProvider } from "@/app/components/LanguageProvider";
import { CartProvider } from "@/app/components/CartContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "AirSmokes",
  description: "Catalogue de produits — projet scolaire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen text-slate-900 dark:text-slate-100">
        <LanguageProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />

              <main className="flex-1 bg-slate-50 dark:bg-slate-950">
                {children}
              </main>

              <Footer />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
