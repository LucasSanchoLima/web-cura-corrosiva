"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";

export async function POST(req: Request, res: Response) {
  const resultado = req;

  const token = resultado.headers.get("authorization");
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  return NextResponse.json({ text: "OK" });
}
