"use client";
import { useCallback, useEffect } from "react";

const ArcoToNumero: { [key: string]: number } = {
  Cap1: 0,
  Cap2: 1,
  Cap2P2: 2,
  Cap2P3: 3,
  Cap3: 4,
  Cap3P2: 5,
  Cap3P3: 6,
  Cap3P4: 7,
  Cap3P5: 8,
};

const numerToText = ["Parte 1 / 1", "Parte 1 / 3", "Parte 2 / 3", "Parte 3 / 3", "Parte 1 / 5", "Parte 2 / 5", "Parte 3 / 5", "Parte 4 / 5", "Parte 5 / 5"];

const numeroToNomeArco = ["Cap1", "Cap2", "Cap2P2", "Cap2P3", "Cap3", "Cap3P2", "Cap3P3", "Cap3P4", "Cap3P5"];

export function Scroll({ pagina }: { pagina: number }) {
  const onScroll = useCallback(() => {
    if (ArcoToNumero[window.location.pathname.split("/")[2]] ==  pagina){
      localStorage.setItem("scroll" + pagina, String(window.scrollY));
      console.log(String(window.scrollY))
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.scrollTo({ top: Number(localStorage.getItem("scroll" + pagina)) ?? 0 });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <></>;
}
