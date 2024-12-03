"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ParagrafoItem } from "./preParagrafo";
import { useWindowSize } from "@/hooks/useWindowSize";
import { enviarParagrafosAutor, carregarCapituloAutor } from "@/components/funcoes/funcoes";
import { useUserContext } from "@/contexts/userContext";

interface ControladorParagrafoProps {
  paragrafos: ParagrafoProps[];
  setParagrafos: React.Dispatch<React.SetStateAction<ParagrafoProps[]>>;
  tamanhoMinimoLetraIPX: number;
  tamanhoMinimoLetraPX: number;
  erroMargenTela: number;
  AtualizarParagrafo: () => void;
  setEnviarDisponivel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ParagrafoProps {
  texto: string;
  id: string;
  index: number;
}

const ControladorParagrafoContext = createContext({} as ControladorParagrafoProps);

export function ControladorParagrafo({ nomeCapitulo, nomeLivro, setCarregando, carregando }: { nomeCapitulo: string; nomeLivro: string; setCarregando: React.Dispatch<React.SetStateAction<boolean>>; carregando: boolean }) {
  const { user } = useUserContext();
  // const { nomeCapitulo, nomeLivro, setCarregando, carregando } = useControladorCapituloContext();

  const [paragrafos, setParagrafos] = useState<ParagrafoProps[]>([]);
  const [enviarDiponivel, setEnviarDisponivel] = useState<boolean>(false);
  const [paragrafosDoServer, setParagrafosDoServer] = useState<ParagrafoProps[]>([]);

  const [tamanhoMinimoLetraPX, setTamanhoMinimoLetraPX] = useState(10);
  const [tamanhoMinimoLetraIPX, setTamanhoMinimoLetraIPX] = useState(10);
  const [erroMargenTela, setErroMargen] = useState(2);
  const windowSize = useWindowSize();

  const memoizedProps = useMemo(() => ({ paragrafos, setParagrafos, tamanhoMinimoLetraIPX, tamanhoMinimoLetraPX, erroMargenTela, AtualizarParagrafo, setEnviarDisponivel }), [paragrafos, setParagrafos]);

  async function carregarParagrafosAutor() {
    let resultado = await carregarCapituloAutor(await user!.getIdToken(), nomeCapitulo, nomeLivro);

    if (resultado.status == 200) {
      setParagrafos([...resultado.paragrafos]);
      setParagrafosDoServer([...resultado.paragrafos]);
    }
  }

  async function enviarParagrafos() {
    if (enviarDiponivel == false) {
      return;
    }
    setEnviarDisponivel(false);

    // console.log(paragrafos);

    await enviarParagrafosAutor(await user!.getIdToken(), paragrafos, nomeCapitulo, nomeLivro);
    await carregarParagrafosAutor();
  }

  function Resize() {
    var pixel = document.getElementById("tamanhoMinimoTextAreaLetra")?.clientWidth;
    if (typeof pixel === "number") {
      setTamanhoMinimoLetraPX(pixel);
    }
    pixel = document.getElementById("tamanhoMinimoTextAreaLetraI")?.clientWidth;
    if (typeof pixel === "number") {
      setTamanhoMinimoLetraIPX(pixel);
    }

    if (windowSize.largura! > 640) {
      setErroMargen(2);
    } else {
      setErroMargen(0);
    }
  }

  function retirarTextoVazio() {
    var mudanca = false;
    var Parte1;
    var Parte2;
    paragrafos.map((par, index) => {
      if (par.texto == "") {
        if (index == 0) {
          Parte1 = paragrafos.splice(1);
          Parte2 = [];
        } else {
          if (index == paragrafos.length) {
            Parte1 = paragrafos;
            Parte1.pop();
            Parte2 = [];
          } else {
            Parte1 = paragrafos.splice(0, index - 1);
            Parte2 = paragrafos.splice(index, paragrafos.length);
          }
        }

        mudanca = true;
      }
    });
    if (mudanca) {
      setParagrafos([...Parte1!, ...Parte2!]);
    }
  }

  function PrecisaReorganizar() {
    for (var index = 0; index < paragrafos.length; index++) {
      if (paragrafos[index].index != index) {
        return true;
      }
    }
    return false;
  }

  function OrganizarParagrafo() {
    if (PrecisaReorganizar()) {
      let Copia: ParagrafoProps[] = [];
      for (var index = 0; index < paragrafos.length; index++) {
        Copia.push({ texto: paragrafos[index].texto, id: paragrafos[index].id, index: index });
      }
      setParagrafos([...Copia]);
    }
  }

  function AtualizarParagrafo() {
    retirarTextoVazio();
    OrganizarParagrafo();
  }

  useEffect(() => {
    carregarParagrafosAutor();
    Resize();
  }, []);

  useEffect(() => {
    AtualizarParagrafo();
  }, [paragrafos]);

  window.addEventListener("resize", Resize);

  return (
    <ControladorParagrafoContext.Provider value={memoizedProps}>
      <div className="flex flex-col text-lg sm:text-xl items-center">
        <p
          className="absolute -top-52"
          id="tamanhoMinimoTextAreaLetra"
        >
          a
        </p>
        <p
          className="absolute -top-52"
          id="tamanhoMinimoTextAreaLetraI"
        >
          i
        </p>
        <div className="w-full h-full max-w-xl">
          {paragrafos.map((textos, index) => {
            return (
              <ParagrafoItem
                idTextArea={"TextArea" + index}
                eHinput={false}
                key={index}
              ></ParagrafoItem>
            );
          })}
        </div>

        <ParagrafoItem
          idTextArea={"TextArea"}
          eHinput={true}
        ></ParagrafoItem>
      </div>
      {enviarDiponivel ? (
        <>
          <div className="my-4 flex flex-row justify-center fixed bottom-0 w-full py-2">
            <button
              className="bg-sky-900 p-2 rounded-md text-xl"
              onClick={() => {
                setCarregando(true);
                enviarParagrafos();
              }}
            >
              Enviar Alterações
            </button>
          </div>
          <div className="h-11 p-5 my-3"></div>
        </>
      ) : (
        <></>
      )}
    </ControladorParagrafoContext.Provider>
  );
}

export function useControladorParagrafoContext() {
  return useContext(ControladorParagrafoContext);
}
