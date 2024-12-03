"use server";
import { jaCadastrado } from "@/server/loginCadastro";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { StringURL } from "../../uteis/verificacoes";

export async function POST(req: Request) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  if (usuario == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  if (usuario!.status == "BANIDO" || usuario!.status == "SHADOWBAN") {
    return NextResponse.json({ text: "Conta invalido", status: 400 });
  }

  const body = await requisicao.json();

  if (body.nomeLivro == body.AntigoTitulo) {
    return NextResponse.json({ text: "Não utilize o mesmo Título", status: 400 });
  }

  if (body.nomeLivro == null || body.nomeLivro == "") {
    return NextResponse.json({ text: "Nome não informado", status: 400 });
  }

  if (body.nomeLivro.search("_") != -1) {
    return NextResponse.json({ text: "Não utilize o _", status: 400 });
  }

  if (body.nomeLivro[0] == " ") {
    return NextResponse.json({ text: "Não comece com um espaço", status: 400 });
  }

  body.nomeLivro = StringURL(body.nomeLivro);

  const livro = await prisma.livro.findMany({ where: { criadorPrincialId: usuario!.id, titulo: body.nomeLivro } });

  if (livro.length > 0) {
    return NextResponse.json({ text: "Titulo já cadastrado", status: 400 });
  }

  const idLivro = await prisma.livro.findFirst({ where: { titulo: body.AntigoTitulo, criadorPrincialId: usuario.id } });

  if (idLivro == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  await prisma.livro.update({ where: { id: idLivro.id }, data: { titulo: body.nomeLivro } });

  return NextResponse.json({ text: "Título Alterado com sucesso" });
}
