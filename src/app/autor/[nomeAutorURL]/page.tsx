"use client";

import { useUserContext } from "@/contexts/userContext";
import { RomanAntique, FontMaquina } from "@/fonts/fonts";
import { autorPegarLivros, pegarAutor } from "@/components/funcoes/funcoes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { usePopUpContext } from "@/contexts/popUpContext";

export default function Autor({ params }: { params: { nomeAutorURL: string } }) {
  const { nomeUsuario, user, atualizarInfo } = useUserContext();
  const { nomeAutorURL } = params;
  const [nomeAutor, setNomeAutor] = useState(decodeURI(nomeAutorURL));
  const { mudaEstadoPopUp } = usePopUpContext();

  const [autor, setAutor] = useState("");
  const [livros, setLivros] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    carregarInfo();
  }, [nomeUsuario]);

  async function carregarInfo() {
    if (nomeAutor == nomeUsuario) {
      let resultado = await autorPegarLivros(await user!.getIdToken());
      if (resultado.status == 200) {
        setAutor(nomeUsuario);
        setLivros(resultado.livros);
        setStatus(resultado.statusLivro);
      }
    } else {
      let resultado = await pegarAutor(nomeAutor);

      if (resultado.status == 200) {
        if (nomeAutor == nomeUsuario) {
          return;
        }

        setAutor(resultado.autor);
        setLivros(resultado.livros);
        setStatus([]);
      }
    }
  }

  return (
    <div className="flex h-full  items-center flex-col">
      <div className="w-full flex justify-center mt-10 sm:mt-20">
        <div className={"flex flex-row items-center bg-zinc-800 text-2xl sm:text-4xl rounded-l-full " + RomanAntique.className}>
          <div className="rounded-full bg-zinc-950 text-center sm:w-20 w-10 m-1 h-10 sm:h-20 flex flex-col">
            <p className={`my-auto ${nomeAutor[0].search(/[a-z]/) < 0 ? "pt-1" : ""} select-none`}>{nomeAutor![0]}</p>
          </div>
          <p className="p-3 max-w-44 sm:max-w-max overflow-hidden text-nowrap ml-2 mr-3">{nomeAutor}</p>
          {autor == nomeUsuario ? (
            <button
              className="ml-3 p-2 sm:mr-2"
              onClick={() => {
                mudaEstadoPopUp(4);
              }}
            >
              <FaEdit
                size={28}
                className="h-0 sm:h-auto"
              />
              <FaEdit
                size={18}
                className="h-auto sm:h-0"
              />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="sm:h-32 h-10"></div>
      <div className="flex flex-wrap justify-center mt-5">
        {autor == nomeUsuario && status != undefined ? (
          status.map((statusLivro, index) => {
            let link = livros[index].replaceAll(" ", "_");
            return (
              <Link
                href={"/autor/" + autor + "/" + link}
                key={livros[index]}
                className="bg-zinc-900 m-5 p-5 h-64 w-48 flex flex-col items-center justify-between"
              >
                <p></p>
                <p className={" text-xl " + FontMaquina.className}>{livros[index]}</p>
                <p>{statusLivro}</p>
              </Link>
            );
          })
        ) : (
          <></>
        )}

        {autor != nomeUsuario && livros != undefined ? (
          livros.map((nomeLivro, index) => {
            let link = nomeLivro.replaceAll(" ", "_");
            return (
              <Link
                href={"/autor/" + autor + "/" + link}
                key={nomeLivro}
                className="bg-zinc-900 m-5 p-5 h-64 w-48 flex items-center justify-center"
              >
                <p className={" text-xl " + FontMaquina.className}>{nomeLivro}</p>
              </Link>
            );
          })
        ) : (
          <></>
        )}

        {autor != nomeUsuario && livros.length == 0 ? (
          <div className=" my-36">
            <p className={" text-xl " + FontMaquina.className}>Esse usuário não tem livros publicados</p>
          </div>
        ) : (
          <></>
        )}

        {autor == nomeUsuario ? (
          <button
            className="bg-sky-950 rounded-lg m-5 p-5 h-64 w-48 flex items-center justify-center"
            onClick={() => {
              mudaEstadoPopUp(5);
            }}
          >
            <p className={" text-xl " + FontMaquina.className}>Adicionar um Novo Livro</p>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
