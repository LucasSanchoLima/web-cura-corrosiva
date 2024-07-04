"use client";

import Link from "next/link";

interface BotaoApoiaseProps {
  texto: string;
  mobile?: boolean;
}

export default function BotaoApoiase({ texto, mobile = false }: BotaoApoiaseProps) {
  return (
    <a
      href="https://www.catarse.me/curacorrosiva"
      target="_blank"
      className={`prevent-select bg-sky-700 rounded  px-3 ${mobile ? "w-3/5 my-2 py-1" : "w-auto my-1.5"}`}
    >
      <p className="text-center w-full font-medium">{texto}</p>
    </a>
  );
}

export function BotaoLer() {
  return (
    <Link
      href="/livro"
      className="w-56 text-center bg-sky-700 rounded m-1 py-1"
    >
      Ler
    </Link>
  );
}
