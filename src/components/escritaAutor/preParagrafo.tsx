"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ParagrafoNormal } from "./paragrafoNormal";
import { ParagrafoEditar } from "./paragrafoEditar";
import { useControladorParagrafoContext, ParagrafoProps } from "./ControladorParagrafo";

interface ParagrafoContextProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  textoParagrafo: string;
  setTextoParagrafo: React.Dispatch<React.SetStateAction<string>>;
  linhas: number;
  setLinhas: React.Dispatch<React.SetStateAction<number>>;
  CarregarTexto: (idTextArea: string) => void;
  idTextArea: string;
  NumeroID: (idTextArea: string) => number;
}

const ParagrafoContext = createContext({} as ParagrafoContextProps);

export function ParagrafoItem({ idTextArea, eHinput }: { eHinput: boolean; idTextArea: string }) {
  const [isEditing, setIsEditing] = useState(eHinput);
  const [textoParagrafo, setTextoParagrafo] = useState("");
  const [linhas, setLinhas] = useState(1);
  const { paragrafos } = useControladorParagrafoContext();

  function NumeroID(idTextArea: string) {
    return parseInt(idTextArea.split("TextArea")[1]);
  }

  function CarregarTexto(idTextArea: string) {
    if (paragrafos[NumeroID(idTextArea)] !== undefined) {
      setTextoParagrafo(paragrafos[NumeroID(idTextArea)].texto);
    }
  }

  useEffect(() => {
    CarregarTexto(idTextArea);
  });

  const memoizedProps = useMemo(() => ({ setIsEditing, textoParagrafo, setTextoParagrafo, linhas, setLinhas, CarregarTexto, idTextArea, NumeroID }), [setIsEditing, textoParagrafo, setTextoParagrafo, linhas, setLinhas]);

  return <ParagrafoContext.Provider value={memoizedProps}>{isEditing ? <ParagrafoEditar id={idTextArea} /> : <ParagrafoNormal />}</ParagrafoContext.Provider>;
}

export function useParagrafoContext() {
  return useContext(ParagrafoContext);
}
