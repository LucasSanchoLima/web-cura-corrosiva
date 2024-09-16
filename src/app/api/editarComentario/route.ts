"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import DOMPurify from "isomorphic-dompurify";
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

  if (body.texto.search(/\w/) == -1) {
    return NextResponse.json({ text: "Texto invalido", status: 400 });
  }

  const limpo = DOMPurify.sanitize(String(body.texto), { USE_PROFILES: { html: false } });
  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  if (usuario!.verificado == false) {
    //enviar erro
    return NextResponse.json({ text: "Não verificado", status: 400 });
  }

  const comentarioOriginal = await prisma.comentario.findUnique({ where: { id: body.idComentario } });

  if (usuario!.id != comentarioOriginal!.usuarioId) {
    return NextResponse.json({ text: "Acho que esse não é seu comentário", status: 400 });
  }

  await prisma.comentario.update({ where: { id: body.idComentario }, data: { status: "EDITADO", texto: body.texto } });

  // await prisma.comentario.create({ data: { usuarioId: usuario!.id, texto: limpo, parteLivroIdURL: body.capitulo, paiId: body.pai } });

  return NextResponse.json({ text: "OK" });
}
