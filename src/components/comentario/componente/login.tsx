"use client";

import { usePopUpContext } from "@/contexts/popUpContext";
import { FontMaquina } from "@/fonts/fonts";

export default function ComentarioLogin() {
  const { mudaEstadoPopUp } = usePopUpContext();

  return (
    <button
      className={`bg-sky-900 rounded-md my-3 px-3 p-1 ${FontMaquina.className}`}
      onClick={() => {
        mudaEstadoPopUp(1);
      }}
    >
      Login
    </button>
  );
}
