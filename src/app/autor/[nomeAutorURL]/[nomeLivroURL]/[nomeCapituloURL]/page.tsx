"use client";

import { useEffect, useState } from "react";
import { FontMaquina } from "@/fonts/fonts";
import { FaEdit } from "react-icons/fa";
import { useUserContext } from "@/contexts/userContext";
import { usePopUpContext } from "@/contexts/popUpContext";
import { carregarCapituloLeitor } from "@/components/funcoes/funcoes";
import { ControladorParagrafo } from "@/components/escritaAutor/ControladorParagrafo";

export default function Autor({ params }: { params: { nomeLivroURL: string; nomeAutorURL: string; nomeCapituloURL: string } }) {
  const { nomeLivroURL, nomeAutorURL, nomeCapituloURL } = params;
  const { nomeUsuario, user } = useUserContext();
  const { mudaEstadoPopUp, qualPopUp } = usePopUpContext();
  const [nomeCapitulo] = useState(decodeURI(nomeCapituloURL).replaceAll("_", " "));
  const [nomeLivro] = useState(decodeURI(nomeLivroURL).replaceAll("_", " "));
  const [nomeAutor] = useState(decodeURI(nomeAutorURL));

  const [erroLeitor, setErroLeitor] = useState(false);
  const [textoErro, setTextoErro] = useState("");

  const [primeiraVez, setPrimeiraVez] = useState(true);

  async function carregarInfo() {
    if (nomeAutor == nomeUsuario) {
      setPrimeiraVez(false);
    } else {
      const resultado = await carregarCapituloLeitor(nomeCapitulo, nomeLivro, nomeAutor);

      if (nomeAutor == nomeUsuario) {
        return;
      }

      if (resultado.status == 400) {
        console.log(resultado.text);
        setTextoErro(resultado.text);
        setErroLeitor(true);
      }

      setPrimeiraVez(false);
    }
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
  ) : nomeAutor == nomeUsuario ? (
    //Autor
    //=====
    <ControladorParagrafo></ControladorParagrafo>
  ) : erroLeitor ? (
    //Leitor
    //=====
    //Erro
    <div className="w-full mt-44 flex">
      <p className={`m-auto text-4xl ${FontMaquina.className} `}>{textoErro}</p>
    </div>
  ) : (
    //Leitor
    //======
    <div>
      <p>Foi</p>
    </div>
  );
}
