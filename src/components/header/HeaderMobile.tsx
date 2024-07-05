"use client";

import { useState } from "react";
import BotaoApoiase from "../botoes/Botoes";
import Link from "next/link";

import { IoMenu } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RomanAntique } from "@/fonts/fonts";

export default function HeaderMobile() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="fixed w-full z-10 text-white flex flex-wrap bg-zinc-900 overflow-hidden top-0 drop-shadow-md">
      <div className="flex justify-between h-9 px-4 w-full">
        <div
          className="my-auto"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <IoMenu
            size={24}
            className={menu ? "stroke-zinc-500" : "stroke-zinc-200"}
          />
        </div>
        <Link
          className="my-auto"
          href={"/"}
        >
          <p className={`${RomanAntique.className} text-2xl`}>Cura Corrosiva</p>
        </Link>
        <div className="my-auto ">
          <CiLogin
            size={24}
            className="stroke-zinc-200"
          />
        </div>
      </div>
      <div className={`w-full flex flex-wrap justify-center ${menu ? "" : "collapse h-0"}`}>
        <Link
          href="/"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenu(false);
          }}
        >
          <p className="text-center">Home</p>
        </Link>
        <Link
          href="/livro"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenu(false);
          }}
        >
          <p className="text-center">Livro</p>
        </Link>
        <Link
          href="/novidades"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenu(false);
          }}
        >
          <p className="text-center">Novidades</p>
        </Link>

        <BotaoApoiase
          texto="Apoie"
          mobile
        />
      </div>
    </header>
  );
}
