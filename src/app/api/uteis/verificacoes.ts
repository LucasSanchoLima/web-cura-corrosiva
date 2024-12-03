"use server";

import { NextResponse } from "next/server";

export async function UsuarioBanido(usuario: any) {
  if (usuario!.status == "BANIDO" || usuario!.status == "SHADOWBAN") {
    console.log(usuario.email + " está como Banido ou ShadowBan");
    return false;
  }
  return true;
}

export async function ValorNull(valor: any, nome: string) {
  if (valor === null || valor === undefined) {
    console.log(nome + " veio como um valor nullo ou indefinido");
    return false;
  }
  return true;
}

// Essa funcão tem que ser async já que está no servidor
// Tirar o async irá quebrar o código.
export async function StringURL(texto: string) {
  return texto.replaceAll(" ", "_");
}
