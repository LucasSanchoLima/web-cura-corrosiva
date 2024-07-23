"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

interface LeitorContextProviderProps {
    children: ReactNode;
  }

  interface LeitorContextProps {
    lendoCap: number;
    setLendoCap: Dispatch<SetStateAction<number>>;
  }

const LeitorContext = createContext<LeitorContextProps>({} as LeitorContextProps);

export function LeitorContextProvider({ children }: LeitorContextProviderProps) {
  const [lendoCap, setLendoCap] = useState(0);

  const value = useMemo(() => {
    return { lendoCap, setLendoCap};
  }, [lendoCap, setLendoCap]);
  return <LeitorContext.Provider value={value}>{children}</LeitorContext.Provider>;
}

export function useLeitorContext() {
  return useContext(LeitorContext);
}
