"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FontMaquina, RomanAntique } from "@/fonts/fonts";

import { useUserContext } from "@/contexts/userContext";
import { usePopUpContext } from "@/contexts/popUpContext";
import { carregarCapituloLeitor } from "@/components/funcoes/funcoes";
import { ControladorParagrafo } from "@/components/escritaAutor/ControladorParagrafo";

// interface ControladorCapituloProps {
//   nomeLivro: string;
//   nomeAutor: string;
//   nomeCapitulo: string;
//   carregando: boolean;
//   setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ControladorCapituloContext = createContext({} as ControladorCapituloProps);

export default function Autor({ params }: { params: { nomeLivroURL: string; nomeAutorURL: string; nomeCapituloURL: string } }) {
  const { nomeLivroURL, nomeAutorURL, nomeCapituloURL } = params;
  const { nomeUsuario } = useUserContext();
  const { qualPopUp } = usePopUpContext();
  const [nomeCapitulo] = useState(decodeURI(nomeCapituloURL).replaceAll("_", " "));
  const [nomeLivro] = useState(decodeURI(nomeLivroURL).replaceAll("_", " "));
  const [nomeAutor] = useState(decodeURI(nomeAutorURL));

  const [paragrafos, setParagrafos] = useState<string[]>([]);

  const [erroLeitor, setErroLeitor] = useState(false);
  const [textoErro, setTextoErro] = useState("");

  const [carregando, setCarregando] = useState(true);

  // const memoizedProps = useMemo(() => ({ nomeLivro, nomeCapitulo, nomeAutor, setCarregando, carregando }), [nomeLivro, nomeCapitulo, nomeAutor]);

  async function carregarInfo() {
    if (nomeAutor == nomeUsuario) {
      return;
    } else {
      const resultado = await carregarCapituloLeitor(nomeCapitulo, nomeLivro, nomeAutor);

      if (nomeAutor == nomeUsuario) {
        return;
      }

      if (resultado.status == 400) {
        setTextoErro(resultado.text);
        setErroLeitor(true);
      }
      if (resultado.status == 200) {
        // console.log(resultado.paragrafos);
        setParagrafos([...resultado.paragrafos]);
      }

      setCarregando(false);
    }
  }

  useEffect(() => {
    if (qualPopUp == 0) {
      carregarInfo();
    }
  }, [qualPopUp]);

  return (
    // <ControladorCapituloContext.Provider value={memoizedProps}>
    carregando ? (
      //Carregando
      //==========
      <div className="w-full mt-44 flex">
        <p className={`m-auto text-4xl ${FontMaquina.className} `}>Carregando...</p>
      </div>
    ) : nomeAutor == nomeUsuario ? (
      //Autor
      //=====
      <ControladorParagrafo {...{ nomeLivro, nomeCapitulo, nomeAutor, setCarregando, carregando }}></ControladorParagrafo>
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
      <div className={RomanAntique.className + " text-zinc-300 max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl sm:text-3xl select-none"}>
        {paragrafos.map((paragrafo, index) => {
          return <p key={index}>{paragrafo}</p>;
        })}
      </div>
    )
    // </ControladorCapituloContext.Provider>
  );
}

// export function useControladorCapituloContext() {
//   return useContext(ControladorCapituloContext);
// }
