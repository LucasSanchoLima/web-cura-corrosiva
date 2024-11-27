"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ParagrafoNormal } from "./paragrafoNormal";
import { ParagrafoEditar } from "./paragrafoEditar";
import { useControladorParagrafoContext } from "./ControladorParagrafo";

interface ParagrafoContextProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  textoParagrafo: string;
  setTextoParagrafo: React.Dispatch<React.SetStateAction<string>>;
  linhas: number;
  setLinhas: React.Dispatch<React.SetStateAction<number>>;
  CarregarTexto: (idTextArea: string) => void;
  idTextArea: string;
}

const ParagrafoContext = createContext({} as ParagrafoContextProps);

export function ParagrafoItem({ idTextArea, eHinput = false }: { eHinput: boolean; idTextArea: string }) {
  const [isEditing, setIsEditing] = useState(eHinput);
  const [textoParagrafo, setTextoParagrafo] = useState("");
  const [linhas, setLinhas] = useState(1);
  const { paragrafos, NumeroID } = useControladorParagrafoContext();

  function CarregarTexto(idTextArea: string) {
    setTextoParagrafo(paragrafos[NumeroID(idTextArea)]);
  }

  useEffect(() => {
    CarregarTexto(idTextArea);
  });

  const memoizedProps = useMemo(() => ({ setIsEditing, textoParagrafo, setTextoParagrafo, linhas, setLinhas, CarregarTexto, idTextArea }), [setIsEditing, textoParagrafo, setTextoParagrafo, linhas, setLinhas]);

  return <ParagrafoContext.Provider value={memoizedProps}>{isEditing ? <ParagrafoEditar id={idTextArea} /> : <ParagrafoNormal />}</ParagrafoContext.Provider>;
}

export function useParagrafoContext() {
  return useContext(ParagrafoContext);
}
