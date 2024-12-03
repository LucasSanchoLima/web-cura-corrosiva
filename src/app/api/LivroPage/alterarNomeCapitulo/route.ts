"use server";
import { jaCadastrado } from "@/server/loginCadastro";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

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

  if (body.novoTitulo == null || body.novoTitulo == "") {
    return NextResponse.json({ text: "Titulo não informado", status: 400 });
  }

  if (body.novoTitulo.search("_") != -1) {
    return NextResponse.json({ text: "Não utilize o _", status: 400 });
  }

  if (body.novoTitulo[0] == " ") {
    return NextResponse.json({ text: "Não comece com um espaço", status: 400 });
  }

  if (body.livro == null || body.livro == "") {
    return NextResponse.json({ text: "", status: 400 });
  }

  const livro = await prisma.livro.findFirst({ where: { criadorPrincialId: usuario!.id, titulo: body.livro } });

  if (livro == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const AntigoTituloLimpo = body.antigoTitulo.replaceAll(" ", "_");
  const NovoTituloLimpo = body.novoTitulo.replaceAll(" ", "_");

  const capitulos = await prisma.capitulo.findFirst({ where: { titulo: AntigoTituloLimpo, livroId: livro.id } });

  if (capitulos == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  await prisma.capitulo.update({ where: { id: capitulos.id }, data: { titulo: NovoTituloLimpo } });

  return NextResponse.json({ text: "Capítulo alterado com sucesso!" });
}
