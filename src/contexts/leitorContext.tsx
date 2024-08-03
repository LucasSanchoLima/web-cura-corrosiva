"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

interface LeitorContextProviderProps {
  children: ReactNode;
}

interface LeitorContextProps {
  lendoCap: number;
  setLendoCap: Dispatch<SetStateAction<number>>;
  idCapAtual: number;
  setIdCapAtual: Dispatch<SetStateAction<number>>;
}

const leitorContext = createContext<LeitorContextProps>({} as LeitorContextProps);

export function LeitorContextProvider({ children }: LeitorContextProviderProps) {
  const [lendoCap, setLendoCap] = useState(0);
  const [idCapAtual, setIdCapAtual] = useState(0);

  const value = useMemo(() => {
    return { lendoCap, setLendoCap, idCapAtual, setIdCapAtual };
  }, [lendoCap, idCapAtual]);
  return <leitorContext.Provider value={value}>{children}</leitorContext.Provider>;
}

export function useLeitorContext() {
  return useContext(leitorContext);
}
