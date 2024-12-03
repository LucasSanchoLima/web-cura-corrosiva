"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const body = await requisicao.json();
  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  await prisma.comentario.update({ data: { status: "EXCLUIDO" }, where: { id: body.idComentario, usuarioId: usuario!.id } });

  return NextResponse.json({ text: "OK" });
}
