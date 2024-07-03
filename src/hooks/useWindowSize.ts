import { useLayoutEffect, useState } from "react";

interface Dimensao {
  largura: number | null;
  altura: number | null;
}

export function useWindowSize() {
  const [size, setSize] = useState<Dimensao>({ largura: null, altura: null });

  useLayoutEffect(() => {
    function windowResize() {
      setSize({ largura: window.innerWidth, altura: window.innerHeight });
    }

    windowResize();
    window.addEventListener("resize", windowResize);

    // quando ele morrer irá executar o return
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);
  return size;
}
