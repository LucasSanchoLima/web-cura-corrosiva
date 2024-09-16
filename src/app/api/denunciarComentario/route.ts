"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const body = await requisicao.json();

  const comentarioOriginal = await prisma.comentario.findUnique({ where: { id: body.idComentario } });

  if (comentarioOriginal == null) {
    return NextResponse.json({ text: "Não concluido", status: 400 });
  }

  const criminoso = await prisma.usuario.findUnique({ where: { id: comentarioOriginal.usuarioId } });

  if (criminoso == null) {
    return NextResponse.json({ text: "Não concluido", status: 400 });
  }

  const denunciador = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  if (denunciador == null) {
    return NextResponse.json({ text: "Não concluido", status: 400 });
  }

  await prisma.denuncia.create({ data: { textoDuplicado: comentarioOriginal.texto, nomeCriminosoDuplicado: criminoso.nome!, ComentarioId: comentarioOriginal.id, criminosoId: criminoso.id, acusadorId: denunciador.id } });

  return NextResponse.json({ text: "OK" });
}
