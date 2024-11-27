"use client";

import { useEffect, useState } from "react";
import { FontMaquina } from "@/fonts/fonts";
import { FaEdit } from "react-icons/fa";
import { useUserContext } from "@/contexts/userContext";
import { usePopUpContext } from "@/contexts/popUpContext";
import { carregarInfoLivro, alterarDescricaoLivro } from "@/components/funcoes/funcoes";
import Link from "next/link";

export default function Autor({ params }: { params: { nomeLivroURL: string; nomeAutorURL: string } }) {
  const { nomeUsuario, user } = useUserContext();
  const { mudaEstadoPopUp, qualPopUp } = usePopUpContext();
  const { nomeLivroURL, nomeAutorURL } = params;
  const [nomeLivro] = useState(decodeURI(nomeLivroURL).replaceAll("_", " "));
  const [nomeAutor] = useState(decodeURI(nomeAutorURL));
  const [capitulos, setCapitulos] = useState<String[]>([]);
  const [primeiraVez, setPrimeiraVez] = useState(true);
  const [ErroLivroEncontrado, setErroLivroEncontrado] = useState(false);
  const [editarDescricao, setEditarDescricao] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [enviandoDescricao, setEnviandoDescricao] = useState(false);

  async function enviarForDescricao(formData: FormData) {
    const textoDescricao = String(formData.get("Descricao"));
    const resultado = await alterarDescricaoLivro(await user!.getIdToken(), textoDescricao.replaceAll(String.fromCharCode(10), "[!]"), nomeLivro);

    setEnviandoDescricao(false);

    if (resultado.status == 400) {
      setErroDescricao(resultado.text);
      return;
    }

    setEditarDescricao(false);
    carregarInfo();
  }

  async function carregarInfo() {
    const resultado = await carregarInfoLivro(nomeLivro, nomeAutor);

    if (resultado.status == 400) {
      setErroLivroEncontrado(true);
    }

    if (resultado.descricao == null) {
      setEditarDescricao(true);
    }

    setCapitulos(resultado.capitulos);
    console.log(capitulos);

    setDescricao(resultado.descricao);
    setPrimeiraVez(false);
  }

  useEffect(() => {
    if (qualPopUp == 0) {
      carregarInfo();
    }
  }, [qualPopUp]);

  return primeiraVez ? (
    //Carregando
    //==========
    <div className="w-full mt-44 flex">
      <p className={`m-auto text-4xl ${FontMaquina.className} `}>Carregando...</p>
    </div>
  ) : ErroLivroEncontrado ? (
    <div className="w-full mt-44 flex">
      <p className={`m-auto text-4xl ${FontMaquina.className} `}>Livro não encontrado</p>
    </div>
  ) : (
    <div className={`mt-10 max-w-6xl mx-auto ${FontMaquina.className} `}>
      {/* Titulo */}
      <div className="w-full bg-zinc-900 p-5 flex flex-row justify-between text-3xl">
        <div className="p-2 h-full w-8"></div>
        <p>{nomeLivro}</p>
        {nomeAutor == nomeUsuario ? (
          <button
            className="p-2"
            onClick={() => {
              mudaEstadoPopUp(6, [nomeLivro, nomeAutor]);
            }}
          >
            <FaEdit size={27} />
          </button>
        ) : (
          <div className="p-2 h-full w-8"></div>
        )}
      </div>
      {/* Final Titulo */}
      <div className="flex flex-row w-full mt-8">
        {/* Sumario */}
        {/* Procurar "OnDrag" no w3schol para solucionar
        o problema de posição de cada capítulo */}
        <div className="w-3/5 bg-zinc-900 h-full mr-4 ">
          <div className="flex flex-col">
            <p className="bg-zinc-800 text-center w-full text-2xl py-1">Sumário</p>
            <div className=" px-12 pt-5 pb-2">
              {capitulos.map((cap) => {
                return (
                  <div className="relative">
                    <Link href={"/autor/" + nomeAutor.replaceAll(" ", "_") + "/" + nomeLivro.replaceAll(" ", "_") + "/" + cap.replaceAll(" ", "_")}>
                      <p className="bg-sky-950 py-2 text-center text-xl mb-5">{cap.replaceAll("_", " ")}</p>
                    </Link>
                    {nomeAutor == nomeUsuario ? (
                      <button
                        className="absolute right-0 top-0 py-3 pr-2 pl-4"
                        onClick={() => {
                          mudaEstadoPopUp(8, [cap, nomeLivro]);
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}

              {nomeAutor == nomeUsuario ? (
                <div className="relative">
                  <button
                    className="w-full "
                    onClick={() => {
                      mudaEstadoPopUp(7, [nomeLivro, nomeAutor]);
                    }}
                  >
                    <p className="bg-sky-950 py-2 text-center text-xl mb-5">+</p>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* Final Sumanrio */}
        {/* Descricao */}
        <div className="w-2/5 ml-4 h-auto">
          <div className="bg-zinc-900">
            <div className="flex flex-row bg-zinc-800">
              <div className="pl-2 pr-3 m-4"></div>
              <p className=" text-center w-full text-2xl py-1">Descrição</p>
              {nomeAutor == nomeUsuario ? (
                <button
                  className="pr-2 pl-3"
                  onClick={() => {
                    setEditarDescricao(!editarDescricao);
                  }}
                >
                  <FaEdit size={18} />
                </button>
              ) : (
                <div className="pl-2 pr-3 m-4"></div>
              )}
            </div>
            {/* Formulario */}
            {editarDescricao ? (
              <form
                action={enviarForDescricao}
                className="flex flex-col relative"
              >
                {enviandoDescricao ? (
                  <div className="w-full h-full bg-zinc-900 flex absolute">
                    <p className="m-auto text-3xl">Enviando...</p>
                  </div>
                ) : (
                  <></>
                )}
                <textarea
                  rows={6}
                  name="Descricao"
                  defaultValue={descricao.replaceAll("[!]", String.fromCharCode(10))}
                  className="mx-4 mt-5 bg-zinc-800 p-2"
                ></textarea>
                {erroDescricao != "" ? <p className="p-2 mx-4 mt-3 rounded-md text-base  text-red-800 border-red-950 border-2">{erroDescricao}</p> : <></>}
                <div className="my-4 flex flex-row justify-around ">
                  {descricao == null ? (
                    <></>
                  ) : (
                    <button
                      className="w-5/12 p-2 bg-red-950"
                      onClick={() => {
                        setEditarDescricao(false);
                      }}
                    >
                      <p>Cancelar</p>
                    </button>
                  )}
                  <input
                    onClick={() => {
                      setEnviandoDescricao(true);
                    }}
                    type="submit"
                    value={"Enviar"}
                    className="p-2 bg-sky-950 w-5/12 cursor-pointer"
                  />
                </div>
              </form>
            ) : (
              // Final Formulario
              <p
                dangerouslySetInnerHTML={{ __html: descricao.replaceAll("[!]", "<br />") }}
                className="p-4 text-justify"
              ></p>
            )}
          </div>
          {/* Final Descricao */}
          {/* Status */}
          {nomeAutor == nomeUsuario ? (
            <div className="bg-zinc-900 mt-5 p-2 flex flex-row align-middle justify-between">
              <div className="p-1 h-full w-8"></div>
              <p className="text-xl text-center">Status: PRIVADO</p>
              {nomeAutor == nomeUsuario ? (
                // <button
                //   className="p-1"
                //   onClick={() => {
                //     mudaEstadoPopUp(6, nomeLivro, nomeAutor);
                //   }}
                // >
                //   <FaEdit size={16} />
                // </button>
                <div className="p-1 h-full w-8"></div>
              ) : (
                <div className="p-1 h-full w-8"></div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
