"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nomePagina: { [key: string]: number } = {
  "/": 0,
  "/livro": 1,
  "/avisos": 2,
};

export default function Header() {
  const [paginaSelecionada, setPaginaSelecionada] = useState(nomePagina[usePathname()]);

  return (
    <header className="w-full text-white flex justify-between px-4 bg-zinc-900 h-9">
      <a
        href="https://www.catarse.me/curacorrosiva"
        target="_blank"
        className="align-self-center flex content-center flex-wrap prevent-select bg-sky-700 rounded px-3 my-1.5"
      >
        <p className="text-center w-full fontMaquina font-medium">Apoie o Projeto</p>
      </a>
      <div className="items-center flex justify-between">
        <Link
          href="/"
          className={`mx-3 ${paginaSelecionada == 0 ? "border-b-2" : ""} border-sky-700`}
          onClick={() => {
            setPaginaSelecionada(0);
          }}
        >
          <p className="px-1.5 fontMaquina font-medium align-middle">Home</p>
        </Link>
        <Link
          href="/livro"
          className={`mx-3 ${paginaSelecionada == 1 ? "border-b-2" : ""} border-sky-700`}
          onClick={() => {
            setPaginaSelecionada(1);
          }}
        >
          <p className="px-1.5 fontMaquina font-light text-sm">Livro</p>
        </Link>
        <Link
          href="/avisos"
          className={`mx-3 ${paginaSelecionada == 2 ? "border-b-2" : ""} border-sky-700`}
          onClick={() => {
            setPaginaSelecionada(2);
          }}
        >
          <p className="px-1.5 fontMaquina font-light text-sm">Anúncios</p>
        </Link>
      </div>
      <div className=" flex justify-between my-1.5">
        <div className=" flex content-center flex-wrap prevent-select bg-sky-950 rounded mx-3 px-3">
          <p className="text-center w-full fontMaquina">Login</p>
        </div>
        <div className=" flex content-center flex-wrap prevent-select rounded">
          <p className="text-center w-full font-light fontMaquina border rounded px-1.5">Cadastrar</p>
        </div>
      </div>
    </header>
  );
}
