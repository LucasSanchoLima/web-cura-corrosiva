"use server";
import { jaCadastrado } from "@/server/loginCadastro";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { UsuarioBanido } from "../../uteis/verificacoes";
import { isBooleanObject } from "util/types";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    console.error("authorization is null");
    // return NextResponse.json({ text: "", status: 400 });
    return;
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  const verificacao = await UsuarioBanido(usuario);

  if (!isBooleanObject(verificacao)) {
    return verificacao;
  }

  // if (usuario!.status == "BANIDO" || usuario!.status == "SHADOWBAN") {
  //   return NextResponse.json({ text: "Conta invalido", status: 400 });
  // }

  const body = await requisicao.json();

  if (body.nomeLivro == null || body.nomeLivro == "") {
    return NextResponse.json({ text: "Nome não informado", status: 400 });
  }

  if (body.nomeLivro.search("_") != -1) {
    return NextResponse.json({ text: "Não utilize o _", status: 400 });
  }

  const livro = await prisma.livro.findMany({ where: { criadorPrincialId: usuario!.id, titulo: body.nomeLivro } });

  if (livro.length > 0) {
    return NextResponse.json({ text: "Livro já cadastrado", status: 400 });
  }

  await prisma.livro.create({ data: { titulo: body.nomeLivro, criadorPrincialId: usuario!.id } });

  return NextResponse.json({ text: "Livro cadastrado com sucesso" });
}
