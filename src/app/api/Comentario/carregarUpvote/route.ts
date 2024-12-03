"use server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = req;

  if (request.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = request.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  const body = await request.json();

  const resultado = await prisma.pontosComentario.findFirst({ where: { comentarioId: body.idComentario, usuarioId: usuario!.id } });

  if (resultado == null || resultado.ponto == 0) {
    return NextResponse.json({ upvote: 0 });
  }

  if (resultado.ponto > 0) {
    return NextResponse.json({ upvote: 1 });
  }

  if (resultado.ponto < 0) {
    return NextResponse.json({ upvote: -1 });
  }
}
