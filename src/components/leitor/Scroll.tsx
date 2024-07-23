"use client";
import { useEffect } from "react";

export function Scroll({ pagina }: { pagina: number }) {
  const onScroll = () => {
    localStorage.setItem("scroll" + pagina, String(window.scrollY));
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.scrollTo({ top: Number(localStorage.getItem("scroll" + pagina)) ?? 0 });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  console.log("Raiz");

  return <></>;
}
