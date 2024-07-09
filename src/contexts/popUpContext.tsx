"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface PopUpContextProviderProps {
  children: ReactNode;
}

interface PopUpContextProps {
  textoBaixo: string;
  titulo: string;
  textoBotao: string;
  qualPopUp: number;
  mudaEstadoPopUp: (valor: number) => void;
}

// sem = 0
// login = 1
// cadastro = 2
// esqueci = 3

const PopUpContext = createContext<PopUpContextProps>({} as PopUpContextProps);

export function PopUpContextProvider({ children }: PopUpContextProviderProps) {
  const [qualPopUp, setQualPopUp] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [textoBaixo, setTextoBaixo] = useState("");
  const [textoBotao, setTextoBotao] = useState("");

  function mudaEstadoPopUp(valor: number) {
    setQualPopUp(valor);
    if (valor == 1) {
      setTitulo("Login");
      setTextoBaixo("Ainda não tenho uma conta");
      setTextoBotao("Logar");
    } else {
      if (valor == 2) {
        setTitulo("Cadastro");
        setTextoBaixo("Já tenho uma conta");
        setTextoBotao("Cadastrar");
      } else {
        setTitulo("Esqueci Minha Senha");
        setTextoBaixo("Voltar");
        setTextoBotao("Enviar");
      }
    }
  }

  const value = useMemo(() => {
    return { qualPopUp, titulo, textoBaixo, textoBotao, mudaEstadoPopUp };
  }, [qualPopUp]);
  return <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>;
}

export function usePopUpContext() {
  return useContext(PopUpContext);
}
