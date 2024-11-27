"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

interface PopUpContextProviderProps {
  children: ReactNode;
}

interface PopUpContextProps {
  textoBaixo: string;
  titulo: string;
  textoBotao: string;
  qualPopUp: number;
  mudaEstadoPopUp: (valor: number, variaveis?: String[]) => void;
  setQualPopUp: Dispatch<SetStateAction<number>>;
  variaveis: String[];
}

// sem = 0
// login = 1
// cadastro = 2
// esqueci = 3
// mudarNome = 4
// denunciarComent = 5

const PopUpContext = createContext<PopUpContextProps>({} as PopUpContextProps);

export function PopUpContextProvider({ children }: PopUpContextProviderProps) {
  const [qualPopUp, setQualPopUp] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [textoBaixo, setTextoBaixo] = useState("");
  const [textoBotao, setTextoBotao] = useState("");
  const [variaveis, setVariaveis] = useState<String[]>([]);

  function mudaEstadoPopUp(valor: number, variaveis: String[] = []) {
    setQualPopUp(valor);
    setVariaveis([]);
    if (valor == 1) {
      setTitulo("Login");
      setTextoBaixo("Ainda não tenho uma conta");
      setTextoBotao("Logar");
      return;
    }
    if (valor == 2) {
      setTitulo("Cadastro");
      setTextoBaixo("Já tenho uma conta");
      setTextoBotao("Cadastrar");
      return;
    }
    if (valor == 3) {
      setTitulo("Esqueci Minha Senha");
      setTextoBaixo("Voltar");
      setTextoBotao("Enviar");
      return;
    }
    if (valor == 4) {
      setTitulo("Mudar de Nome");
      setTextoBaixo("");
      setTextoBotao("Mudar");
      return;
    }
    if (valor == 5) {
      setTitulo("Adicionar Livro");
      setTextoBaixo("");
      setTextoBotao("Criar");
      return;
    }
    if (valor == 6) {
      setTitulo("Alterar Título do Livro");
      setTextoBaixo("");
      setTextoBotao("Alterar");
      setVariaveis(variaveis);
      return;
    }
    if (valor == 7) {
      setTitulo("Adicionar novo Capítulo");
      setTextoBaixo("");
      setTextoBotao("Criar");
      setVariaveis(variaveis);
      return;
    }
    if (valor == 8) {
      setTitulo("Alterar nome de Capítulo");
      setTextoBaixo("");
      setTextoBotao("Alterar");
      setVariaveis(variaveis);
      return;
    }
  }

  const value = useMemo(() => {
    return { qualPopUp, titulo, textoBaixo, variaveis, textoBotao, mudaEstadoPopUp, setQualPopUp };
  }, [qualPopUp]);
  return <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>;
}

export function usePopUpContext() {
  return useContext(PopUpContext);
}
