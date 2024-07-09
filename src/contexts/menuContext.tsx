"use client";

import { usePathname } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

interface MenuContextProviderProps {
  children: ReactNode;
}

interface MenuContextProps {
  setPaginaSelecionada: Dispatch<SetStateAction<number>>;
  setMenuConta: Dispatch<SetStateAction<boolean>>;
  paginaSelecionada: number;
  menuConta: boolean;
}

const nomePagina: { [key: string]: number } = {
  "/": 0,
  "/livro": 1,
  "/avisos": 2,
};

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);

export function MenuContextProvider({ children }: MenuContextProviderProps) {
  const [paginaSelecionada, setPaginaSelecionada] = useState(nomePagina[usePathname()]);
  const [menuConta, setMenuConta] = useState(false);
  const value = useMemo(() => {
    return { paginaSelecionada, menuConta, setPaginaSelecionada, setMenuConta };
  }, [paginaSelecionada, menuConta]);
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  return useContext(MenuContext);
}
