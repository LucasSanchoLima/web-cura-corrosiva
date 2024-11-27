"use client";

import { useEffect } from "react";
import { useControladorParagrafoContext } from "./ControladorParagrafo";
import { useParagrafoContext } from "./preParagrafo";

export function ParagrafoEditar({ id }: { id: string }) {
  const { setTextoParagrafo, textoParagrafo, linhas, setLinhas, setIsEditing } = useParagrafoContext();
  const { AtualizarTextArea, AtualizarParagrafo } = useControladorParagrafoContext();

  useEffect(() => {
    setLinhas(AtualizarTextArea(id));
  });

  return (
    <textarea
      onInput={() => {
        var resultado = AtualizarTextArea(id);
        AtualizarParagrafo();
        if (resultado == -1) {
          setIsEditing(false);
        }
        setLinhas(resultado);
      }}
      id={id}
      defaultValue={textoParagrafo}
      rows={linhas}
      className="w-full h-full max-w-xl mb-10 bg-zinc-800 overflow-hidden rounded-md p-1 mt-3 sm:p-2 sm:py-3"
    ></textarea>
  );
}
