"use client";

import Link from "next/link";
import { useMenuContext } from "@/contexts/menuContext";
import { FontMaquina } from "@/fonts/fonts";
import { useUserContext } from "@/contexts/userContext";
import { usePopUpContext } from "@/contexts/popUpContext";
import { inscreverNewsletter } from "@/server/server";

export default function HeaderDesktop() {
  const { paginaSelecionada, setPaginaSelecionada, menuConta, setMenuConta, newsLetter, setNewsLetter } = useMenuContext();
  const { mudaEstadoPopUp } = usePopUpContext();
  const { logOut, user, nomeUsuario } = useUserContext();

  async function newsletter(formData: FormData) {
    await inscreverNewsletter(formData);
    setNewsLetter(false);
  }

  return (
    <header className={`fixed w-full text-white overflow-hidden top-0 ${FontMaquina.className}`}>
      <div className="flex justify-between bg-zinc-900 px-4">
        <div className="w-1/3 flex justify-start">
          <button
            className="prevent-select bg-sky-700 rounded px-2 my-1"
            onClick={() => {
              setNewsLetter(!newsLetter);
            }}
          >
            Receber novidades
          </button>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="items-center flex justify-between text-center">
            <Link
              href="/"
              className={` mx-3 ${paginaSelecionada == 0 ? "border-b-2" : ""} border-sky-700`}
              onClick={() => {
                setPaginaSelecionada(0);
              }}
            >
              <p className={`px-1.5 fontMaquina ${paginaSelecionada == 0 ? "font-medium" : "font-small text-sm"}`}>Home</p>
            </Link>
            <Link
              href="/livro"
              className={`mx-3 ${paginaSelecionada == 1 ? "border-b-2" : ""} border-sky-700`}
              onClick={() => {
                setPaginaSelecionada(1);
              }}
            >
              <p className={`px-1.5 fontMaquina ${paginaSelecionada == 1 ? "font-medium" : "font-small text-sm"}`}>Livro</p>
            </Link>
            <Link
              href="/progresso"
              className={`mx-3 ${paginaSelecionada == 2 ? "border-b-2" : ""} border-sky-700`}
              onClick={() => {
                setPaginaSelecionada(2);
              }}
            >
              <p className={`px-1.5 fontMaquina ${paginaSelecionada == 2 ? "font-medium" : "font-small text-sm"}`}>Progresso</p>
            </Link>
            {/* <Link
              href="/mensagem"
              className={`mx-3 ${paginaSelecionada == 3 ? "border-b-2" : ""} border-sky-700`}
              onClick={() => {
                setPaginaSelecionada(3);
              }}
            >
              <p className={`px-1.5 fontMaquina ${paginaSelecionada == 3 ? "font-medium" : "font-small text-sm"}`}>Novidades</p>
            </Link> */}
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          {user ? (
            <button
              onClick={() => {
                setMenuConta(!menuConta);
              }}
            >
              {nomeUsuario == null ? <p>Logado</p> : <p>{nomeUsuario}</p>}
            </button>
          ) : (
            <div className="flex justify-between my-1.5 w-auto">
              <button
                onClick={() => {
                  mudaEstadoPopUp(1);
                }}
                className="flex content-center flex-wrap prevent-select bg-sky-950 rounded mx-3 px-3"
              >
                <p className={`text-center w-full fontMaquina ${menuConta ? "stroke-zinc-500" : "stroke-zinc-200"}`}>Login</p>
              </button>
              <button
                onClick={() => {
                  mudaEstadoPopUp(2);
                }}
                className="flex content-center flex-wrap prevent-select rounded"
              >
                <p className="text-center font-light fontMaquina border rounded px-1.5">Cadastrar</p>
              </button>
            </div>
          )}
        </div>
      </div>
      {user ? (
        menuConta ? (
          <div className="flex flex-col rounded-b-xl p-3 bg-zinc-900 fixed right-0">
            <Link
              onClick={() => {
                setMenuConta(false);
              }}
              href={"/autor/" + nomeUsuario}
              className="text-center mx-8"
            >
              Minha Conta
            </Link>
            <button
              onClick={() => {
                logOut();
                setMenuConta(false);
              }}
              className="text-center mx-8"
            >
              Sair
            </button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {newsLetter ? (
        <div className=" rounded-b-xl p-3 w-96 bg-zinc-900 fixed left-0">
          <form
            action={newsletter}
            className="flex flex-col"
          >
            <p className="mb-1 ml-2 text-sm sm:text-base">E-mail:</p>
            <input
              className="rounded-full bg-white p-1 pl-3 text-zinc-900"
              type="text"
              name="email"
            />
            <input
              className="mt-2 bg-sky-800 rounded-full px-5 mx-auto text-lg cursor-pointer"
              type="submit"
              value="Enviar"
            />
          </form>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
