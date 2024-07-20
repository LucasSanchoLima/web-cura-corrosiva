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
import { inscreverNewsletter } from "@/server/server";

export default function HeaderMobile() {
  const { mudaEstadoPopUp } = usePopUpContext();
  const { user, logOut } = useUserContext();
  const { menuConta, setMenuConta, menuMobile, setMenuMobile } = useMenuContext();

  async function newsletter(formData: FormData) {
    await inscreverNewsletter(formData);
    setMenuMobile(false);
  }

  return (
    <header className={`fixed w-full z-10 text-white flex flex-wrap bg-zinc-900 h-9 top-0 drop-shadow-md select-none ${FontMaquina.className} `}>
      <div className="flex justify-between px-4 w-full">
        <div className="w-1/3 flex items-center">
          <button
            className="my-auto "
            onClick={() => {
              setMenuMobile(!menuMobile);
              if (menuConta) {
                setMenuConta(false);
              }
            }}
          >
            <IoMenu
              size={24}
              className={menuMobile ? "stroke-zinc-500" : "stroke-zinc-200"}
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
                if (menuMobile) {
                  setMenuMobile(false);
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
      <div className={`w-full bg-zinc-900 flex flex-wrap justify-center  ${menuMobile ? "" : "-translate-y-80"}`}>
        <Link
          href="/"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenuMobile(false);
          }}
        >
          <p className="text-center">Home</p>
        </Link>
        <Link
          href="/livro"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenuMobile(false);
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
        {/* <Link
          href="/mansagem"
          className="bg-zinc-800 w-3/5 py-1 rounded my-2"
          onClick={() => {
            setMenu(false);
          }}
        >
          <p className="text-center">Mensagens</p>
        </Link> */}
        {/* <div className="bg-zinc-800 w-3/5 py-1 rounded my-2">
          <p className="text-center">Receber Novidades</p>

          <form
            action={newsletter}
            className="flex flex-col mx-2"
          >
            <p className="mb-1 ml-2 text-xs">E-mail:</p>
            <input
              className="rounded-full bg-white p-1 pl-3 text-sm text-zinc-900"
              type="email"
              name="email"
            />
            <input
              className="mt-2 bg-sky-800 rounded-full px-5 mx-auto cursor-pointer"
              type="submit"
              value="Enviar"
            />
          </form>
        </div> */}
        {/* <BotaoApoiase
          texto="Apoie"
          mobile
        /> */}
      </div>
      <div className={`w-full fixed bg-zinc-900 flex flex-col justify-center top-9 ${menuConta ? "" : "-translate-y-60"}`}>
        {/* <Link
          onClick={() => {
            setMenuConta(false);
          }}
          href={"/conta"}
          className="my-1 p-2 text-center"
        >
          Minha Conta
        </Link> */}

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
