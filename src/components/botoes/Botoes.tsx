"use client";

import { useMenuContext } from "@/contexts/menuContext";
import { FontMaquina } from "@/fonts/fonts";
import Link from "next/link";

interface BotaoApoiaseProps {
  texto: string;
  mobile?: boolean;
}

export default function BotaoApoiase({ texto, mobile = false }: BotaoApoiaseProps) {
  return (
    <Link
      href="https://www.catarse.me/curacorrosiva"
      target="_blank"
      className={`prevent-select bg-sky-700 rounded  px-3 ${mobile ? "w-3/5 my-2 py-1" : "w-auto my-1.5"}`}
    >
      <p className="text-center w-full font-medium">{texto}</p>
    </Link>
  );
}

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
