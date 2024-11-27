"use server";

import { NextResponse } from "next/server";

export function UsuarioBanido(usuario: any) {
  if (usuario!.status == "BANIDO" || usuario!.status == "SHADOWBAN") {
    return NextResponse.json({ text: "Conta invalido", status: 400 });
  }
  return true;
}
