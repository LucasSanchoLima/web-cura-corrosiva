"use client";
import { useCallback, useEffect } from "react";
import { ArcoToNumero } from "./variaveis";
import { useLeitorContext } from "@/contexts/leitorContext";

export function Scroll({ pagina }: { pagina: number }) {
  const { setIdCapAtual } = useLeitorContext();
  setIdCapAtual(pagina);

  const onScroll = useCallback(() => {
    if (ArcoToNumero[window.location.pathname.split("/")[2]] == pagina) {
      localStorage.setItem("scroll" + pagina, String(window.scrollY));
      // console.log(String(window.scrollY))
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
