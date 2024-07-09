"use client";

import { useState } from "react";
import BotaoApoiase from "../botoes/Botoes";
import Link from "next/link";

import { IoMenu } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RomanAntique, FontMaquina } from "@/fonts/fonts";
import { usePopUpContext } from "@/contexts/popUpContext";
import { useUserContext } from "@/contexts/userContext";
import { useMenuContext } from "@/contexts/menuContext";

export default function HeaderMobile() {
  const [menu, setMenu] = useState(false);
  const { mudaEstadoPopUp } = usePopUpContext();
  const { user, logOut } = useUserContext();
  const { menuConta, setMenuConta } = useMenuContext();

  return (
    <header className={`fixed w-full z-10 text-white flex flex-wrap bg-zinc-900 h-9 top-0 drop-shadow-md select-none ${FontMaquina.className} `}>
      <div className="flex justify-between px-4 w-full">
        <div className="w-1/3 flex items-center">
          <button
            className="my-auto "
            onClick={() => {
              setMenu(!menu);
              if (menuConta) {
                setMenuConta(false);
              }
            }}
          >
            <IoMenu
              size={24}
              className={menu ? "stroke-zinc-500" : "stroke-zinc-200"}
            />
          </button>
        </div>
        <div className="w-1/3 flex justify-center">
          <Link
            className="my-auto"
            href={"/"}
          >
            <p className={`${RomanAntique.className} text-nowrap text-xl`}>Cura Corrosiva</p>
          </Link>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          {user ? (
            <button
              className={menuConta ? "text-zinc-400" : "text-zinc-100"}
              onClick={() => {
                setMenuConta(!menuConta);
                if (menu) {
                  setMenu(false);
                }
              }}
            >
              <p>Logado</p>
            </button>
          ) : (
            <button
              onClick={() => {
                mudaEstadoPopUp(1);
              }}
              className="my-auto "
            >
              <CiLogin
                size={24}
                className="stroke-zinc-200"
              />
            </button>
          )}
        </div>
      </div>
      <div className={`w-full bg-zinc-900 flex flex-wrap justify-center  ${menu ? "" : "-translate-y-60"}`}>
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
        {/* <Link
          href="/novidades"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenu(false);
          }}
        >
          <p className="text-center">Novidades</p>
        </Link> */}

        <BotaoApoiase
          texto="Apoie"
          mobile
        />
      </div>
      <div className={`w-full fixed bg-zinc-900 flex flex-wrap justify-center top-9 ${menuConta ? "" : "-translate-y-60"}`}>
        <button
          onClick={() => {
            logOut();
            setMenuConta(false);
          }}
          className="my-1 p-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
