"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ParagrafoItem } from "./preParagrafo";
import { useWindowSize } from "@/hooks/useWindowSize";

interface ControladorParagrafoProps {
  paragrafos: string[];
  setParagrafos: React.Dispatch<React.SetStateAction<string[]>>;
  tamanhoMinimoLetraIPX: number;
  tamanhoMinimoLetraPX: number;
  erroMargenTela: number;
  AtualizarTextArea: (idTextArea: string) => number;
  NumeroID: (idTextArea: string) => number;
  AtualizarParagrafo: () => void;
}

const ControladorParagrafoContext = createContext({} as ControladorParagrafoProps);

function calculoDeLinhas(paragrafo: string, largura: number, tamanhoMinimoLetraIPX: number, tamanhoMinimoLetraPX: number, erroMargenTela: number) {
  const letrapequena = (paragrafo.match(/[iljI1!(){}"'-,.; ]/g) || []).length;

  return Math.floor(((letrapequena * tamanhoMinimoLetraIPX + (paragrafo.length - letrapequena + erroMargenTela) * tamanhoMinimoLetraPX) / largura) * 1.15);
}

export function ControladorParagrafo() {
  const [paragrafos, setParagrafos] = useState<string[]>([]);
  const [paragrafosDoServer, setParagrafosDoServer] = useState<string[]>([]);

  const [tamanhoMinimoLetraPX, setTamanhoMinimoLetraPX] = useState(10);
  const [tamanhoMinimoLetraIPX, setTamanhoMinimoLetraIPX] = useState(10);
  const [erroMargenTela, setErroMargen] = useState(2);
  const windowSize = useWindowSize();

  const memoizedProps = useMemo(() => ({ paragrafos, setParagrafos, tamanhoMinimoLetraIPX, tamanhoMinimoLetraPX, erroMargenTela, AtualizarTextArea, NumeroID, AtualizarParagrafo }), [paragrafos, setParagrafos]);

  function NumeroID(idTextArea: string) {
    return parseInt(idTextArea.split("TextArea")[1]);
  }

  function enviarAPI() {}

  function Resize() {
    setTamanhoMinimoLetraPX(document.getElementById("tamanhoMinimoTextAreaLetra")!.clientWidth);
    setTamanhoMinimoLetraIPX(document.getElementById("tamanhoMinimoTextAreaLetraI")!.clientWidth);

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
    paragrafos.map((texto, index) => {
      if (texto == "") {
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

  function AtualizarParagrafo() {
    retirarTextoVazio();
  }

  function AtualizarTextArea(idTextArea: string) {
    let textArea = document.getElementById(idTextArea) as HTMLInputElement;

    let index = NumeroID(idTextArea);

    if (textArea.value.search(String.fromCharCode(10) + String.fromCharCode(10)) != -1) {
      const textos = textArea.value.split(String.fromCharCode(10) + String.fromCharCode(10));
      const ultimo = textos[textos.length - 1];
      textArea.value = ultimo;
      textos.pop();
      if (Number.isNaN(index)) {
        let Copia: string[] = [];
        textos.map((texto) => {
          if (texto != "") {
            Copia.push(texto);
          }
        });
        setParagrafos([...paragrafos, ...Copia]);
      } else {
        // Quando eu estava editando textos no site, acabava dando enter
        // para enviar a edição, porém ele compreendia que eu estava tentando
        // criar 2 paragrafos diferentes, então optei por concatené-los
        if (textos.length == 2) {
          textos[0] = textos[0] + textos[1];
          textos.pop();
        }

        // Como o splice tem um modo diferente de ser usado quando se utiliza numeros negativos, criamos o caso do index ser 0 e dele ser igual ao tamanho do paragrafos
        let Copia: string[] = [];
        if (index == 0) {
          textos.map((texto) => {
            if (texto != "") {
              Copia.push(texto);
            }
          });
          Copia.push(...paragrafos.splice(1));
        } else {
          if (index == paragrafos.length - 1) {
            Copia = [...paragrafos];
            Copia.pop();
            textos.map((texto) => {
              if (texto != "") {
                Copia.push(texto);
              }
            });
          } else {
            Copia = [...paragrafos.splice(0, index)];
            textos.map((texto) => {
              if (texto != "") {
                Copia.push(texto);
              }
            });
            Copia.push(...paragrafos.splice(index - 1, paragrafos.length));
          }
        }
        setParagrafos([...Copia]);

        return -1;
      }
    }

    let calculo = textArea.value.split(String.fromCharCode(10)).length;

    textArea.value.split("\n").forEach((paragrafo) => {
      calculo += calculoDeLinhas(paragrafo, textArea.clientWidth, tamanhoMinimoLetraIPX, tamanhoMinimoLetraPX, erroMargenTela);
    });

    return calculo;
  }

  useEffect(() => {
    AtualizarParagrafo();
  }, [paragrafos]);

  useEffect(() => {
    Resize();
  }, []);

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
              ></ParagrafoItem>
            );
          })}
        </div>

        <ParagrafoItem
          idTextArea={"TextArea"}
          eHinput={true}
        ></ParagrafoItem>

        {/* <textarea
          className="w-full h-full max-w-xl mb-10 bg-zinc-800 overflow-hidden rounded-md p-1 mt-3 sm:p-2 sm:py-3"
          onInput={() => {
            setLinhasTextArea(AtualizarTextArea("TextArea"));
          }}
          rows={linhasTextArea}
          id="TextArea"
        ></textarea> */}
      </div>
    </ControladorParagrafoContext.Provider>
  );
}

export function useControladorParagrafoContext() {
  return useContext(ControladorParagrafoContext);
}
