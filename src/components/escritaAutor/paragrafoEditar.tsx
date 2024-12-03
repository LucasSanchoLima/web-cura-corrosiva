"use client";

import { useEffect } from "react";
import { useControladorParagrafoContext, ParagrafoProps } from "./ControladorParagrafo";
import { useParagrafoContext } from "./preParagrafo";

export function ParagrafoEditar({ id }: { id: string }) {
  const { textoParagrafo, linhas, setLinhas, setIsEditing, NumeroID } = useParagrafoContext();
  const { AtualizarParagrafo, setParagrafos, paragrafos, tamanhoMinimoLetraIPX, tamanhoMinimoLetraPX, erroMargenTela, setEnviarDisponivel } = useControladorParagrafoContext();

  function calculoDeLinhas(texto: string, largura: number, tamanhoMinimoLetraIPX: number, tamanhoMinimoLetraPX: number, erroMargenTela: number) {
    const letrapequena = (texto.match(/[iljI1!(){}"'-,.; ]/g) || []).length;

    return Math.floor(((letrapequena * tamanhoMinimoLetraIPX + (texto.length - letrapequena + erroMargenTela) * tamanhoMinimoLetraPX) / largura) * 1.15);
  }

  function AtualizarTextArea(idTextArea: string) {
    let textArea = document.getElementById(idTextArea) as HTMLInputElement;

    let index = NumeroID(idTextArea);

    if (textArea.value.search(String.fromCharCode(10) + String.fromCharCode(10)) != -1) {
      setEnviarDisponivel(true);
      const textos = textArea.value.split(String.fromCharCode(10) + String.fromCharCode(10));
      const ultimo = textos[textos.length - 1];
      textArea.value = ultimo;
      textos.pop();
      let Copia: ParagrafoProps[] = [];
      if (Number.isNaN(index)) {
        textos.map((texto) => {
          if (texto != "") {
            Copia.push({ texto: texto, id: "", index: -1 });
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
        if (index == 0) {
          textos.map((texto) => {
            if (texto != "") {
              Copia.push({ texto: texto, id: "", index: -1 });
            }
          });
          Copia.push(...paragrafos.splice(1));
        } else {
          if (index == paragrafos.length - 1) {
            Copia = [...paragrafos];
            Copia.pop();
            textos.map((texto) => {
              if (texto != "") {
                Copia.push({ texto: texto, id: "", index: -1 });
              }
            });
          } else {
            Copia = [...paragrafos.splice(0, index)];
            textos.map((texto) => {
              if (texto != "") {
                Copia.push({ texto: texto, id: "", index: -1 });
              }
            });
            Copia.push(...paragrafos.splice(1));
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
    setLinhas(AtualizarTextArea(id));
  });

  return (
    <textarea
      onInput={() => {
        var resultado = AtualizarTextArea(id);
        if (resultado == -1) {
          setIsEditing(false);
        }
        setLinhas(resultado);
      }}
      id={id}
      defaultValue={textoParagrafo}
      rows={linhas}
      className="w-full h-full max-w-xl mb-10 bg-zinc-800 overflow-hidden rounded-md p-1 mt-4 sm:p-2 sm:py-3"
    ></textarea>
  );
}
