"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    return NextResponse.json({ text: "Sem autorização", status: 400 });
  }

  if (requisicao.headers.get("authorization")!.split(" ").length <= 1) {
    return NextResponse.json({ text: "Sem autorização", status: 400 });
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  return NextResponse.json({ nome: usuario?.nome, verificado: usuario?.verificado });
}
