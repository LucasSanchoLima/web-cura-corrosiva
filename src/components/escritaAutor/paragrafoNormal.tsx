"use client";

import { useEffect, useState } from "react";
import { useParagrafoContext } from "./preParagrafo";

export function ParagrafoNormal() {
  const { textoParagrafo, setIsEditing, CarregarTexto, idTextArea } = useParagrafoContext();

  useEffect(() => {
    CarregarTexto(idTextArea);
  });

  return (
    <div
      onClick={() => {
        setIsEditing(true);
      }}
      className="w-full h-full text-left max-w-xl mb-3 bg-zinc-800 overflow-hidden rounded-md p-1 mt-3 sm:p-2 sm:py-3"
    >
      {textoParagrafo.split(String.fromCharCode(10)).map((texto) => {
        return <p>{texto}</p>;
      })}
    </div>
  );
}
