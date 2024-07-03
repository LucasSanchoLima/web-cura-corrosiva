"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BotaoApoiase from "@/components/botoes/Botoes";
import { useWindowSize } from "@/hooks/useWindowSize";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

const nomePagina: { [key: string]: number } = {
  "/": 0,
  "/livro": 1,
  "/avisos": 2,
};

export default function Header() {
  const [paginaSelecionada, setPaginaSelecionada] = useState(nomePagina[usePathname()]);
  const windowSize = useWindowSize();

  useEffect(() => {
    console.log(windowSize.largura);
  }, [windowSize]);

  return <>{windowSize.largura! > 640 ? <HeaderDesktop /> : <HeaderMobile />}</>;
}
