"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { pegarComentario } from "@/components/funcoes/funcoes";

export interface ComentarioProps {
  id: string;
  texto: string;
  pontos: number;
  usuario: {
    nome: string | null;
  };
}

interface ArrayComentarioContextProps {
  comentarios: ComentarioProps[];
  // setArco: Dispatch<SetStateAction<number>>;
  primeiraVez: boolean;
  recarregarComentarios: () => Promise<void>;
}

interface ArrayComentarioContextProviderProps {
  arco: number;
  children: ReactNode;
}

const arrayComentarioContext = createContext<ArrayComentarioContextProps>({} as ArrayComentarioContextProps);

export function ArrayComentarioContextProvider({ arco, children }: ArrayComentarioContextProviderProps) {
  const [primeiraVez, setPrimeiraVez] = useState(true);
  const [comentarios, setComentarios] = useState<ComentarioProps[]>([]);
  // const [arco, setArco] = useState(0);

  async function recarregarComentarios() {
    setPrimeiraVez(false);
    let valor = await pegarComentario(arco, 0, 10);
    setComentarios(valor.comentarios);
  }

  const value = useMemo(() => {
    return { comentarios, recarregarComentarios, primeiraVez };
  }, [comentarios, primeiraVez]);
  return <arrayComentarioContext.Provider value={value}>{children}</arrayComentarioContext.Provider>;
}

export function useArrayComentarioContext() {
  return useContext(arrayComentarioContext);
}
