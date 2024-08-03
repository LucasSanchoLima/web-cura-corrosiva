"use client";

import { useMenuContext } from "@/contexts/menuContext";
import { FontMaquina } from "@/fonts/fonts";
import Link from "next/link";

export function BotaoLer() {
  const { setPaginaSelecionada } = useMenuContext();

  return (
    <Link
      href="/livro"
      onClick={() => {
        setPaginaSelecionada(1);
      }}
      className={`w-56 text-center bg-sky-700 rounded my-1 py-1 flex justify-center mx-auto ${FontMaquina.className}`}
    >
      Ler
    </Link>
  );
}
