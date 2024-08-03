"use client";

import { Alice, MirageFinal, Radio } from "@/fonts/fonts";

export function tagComentario(tipo: string, idElemento: string, largura: number) {
  let valorInput = document.getElementById(idElemento) as HTMLInputElement;

  let chaves = "[  ]";

  if (largura <= 640) {
    chaves = "[    ]";

    if (valorInput.value != "") {
      valorInput.value += "\n";
    }
  }

  valorInput.value += tipo + chaves + tipo;
}

export function trasformarTextoCom(texto: string) {
  let textoEditado = texto;
  textoEditado = textoEditado.replaceAll("[!]", "<br />");
  // textoEditado = textoEditado.replaceAll(/s\[(.*)\]s/g, teste());
  // textoEditado = textoEditado.replaceAll(/s\[(.*)\]s/g, "<span class=" + ">$1</span>");
  textoEditado = textoEditado.replaceAll(/t\[(.*)\]t/g, "<span class=" + MirageFinal.className + ">$1</span>");
  textoEditado = textoEditado.replaceAll(/a\[(.*)\]a/g, "<span class=" + Alice.className + ">$1</span>");
  textoEditado = textoEditado.replaceAll(/r\[(.*)\]r/g, "<span class=" + Radio.className + ">$1</span>");

  return textoEditado;
}
