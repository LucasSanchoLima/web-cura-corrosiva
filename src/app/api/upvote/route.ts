"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";
import { atualizarPonto } from "@/utils/servidor";

export async function POST(req: Request, res: Response) {
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

  const sql = await prisma.pontosComentario.findFirst({ where: { usuarioId: usuario!.id, comentarioId: body.IDcomentario } });

  if (usuario!.verificado == false) {
    //enviar erro
    return NextResponse.json({ text: "Não verificado" });
  }

  let valor = 0;

  if (body.positivo) {
    valor = 1;
  } else {
    valor = -1;
  }

  if (sql == null) {
    await prisma.pontosComentario.create({ data: { ponto: valor, comentarioId: body.IDcomentario, usuarioId: usuario!.id } });
    atualizarPonto(body.IDcomentario);
    return NextResponse.json({ text: "Criado" });
  }

  if (sql.ponto == valor) {
    // await prisma.pontosComentario.delete({ where: { id: sql.id } });
    await prisma.pontosComentario.update({ where: { id: sql.id }, data: { ponto: 0 } });
    atualizarPonto(body.IDcomentario);
    return NextResponse.json({ text: "Desfeito" });
  }

  if (sql.ponto != valor) {
    await prisma.pontosComentario.update({ where: { id: sql.id }, data: { ponto: valor } });
    atualizarPonto(body.IDcomentario);
    return NextResponse.json({ text: "Alterado" });
  }
}
