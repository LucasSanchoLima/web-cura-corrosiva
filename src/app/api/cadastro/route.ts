"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";

export async function POST(req: Request) {
  const resultado = req;

  if (resultado.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = resultado.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  return NextResponse.json({ text: "OK" });
}
