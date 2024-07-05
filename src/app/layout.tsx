import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { MenuContextProvider } from "@/contexts/menuContext";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cura Corrosiva",
  description: "Site do Livro Tudo por Você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* <GoogleTagManager gtmId="GTM-N22LR9RD" /> */}
      <GoogleTagManager gtmId="G-3ZRQWLF62F" />
      <GoogleAnalytics gaId="G-3ZRQWLF62F" />
      {/* <GoogleAnalytics gaId="G-3ZRQWLF62F" /> */}
      <body className={inter.className + " pt-9 text-white bg-zinc-950 bg-none"}>
        <MenuContextProvider>
          <Header />
          {children}
        </MenuContextProvider>
      </body>
    </html>
  );
}
