import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { MenuContextProvider } from "@/contexts/menuContext";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { UserContextProvider } from "@/contexts/userContext";
import { PopUpContextProvider } from "@/contexts/popUpContext";
import { LeitorContextProvider } from "@/contexts/leitorContext";
import PopUp from "@/components/popUp/PopUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cura Corrosiva",
  description: "Site do Livro Tudo por Você",
};

//Usar um useeffect para pegar as informações do servidor de config de usaurio
//Usar o window.addEvent para salvar informações antes de sair da pagina.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <GoogleTagManager gtmId="G-3ZRQWLF62F" />
      <GoogleAnalytics gaId="G-3ZRQWLF62F" />
      <body className={inter.className + " pt-9 text-white bg-zinc-950 bg-none"}>
        <UserContextProvider>
          <MenuContextProvider>
            <PopUpContextProvider>
              <PopUp />
              <Header />
              <LeitorContextProvider>{children}</LeitorContextProvider>
            </PopUpContextProvider>
          </MenuContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
