"use server";
import { jaCadastrado } from "@/server/loginCadastro";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import DOMPurify from "isomorphic-dompurify";
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
  const limpo = DOMPurify.sanitize(String(body.descricao), { USE_PROFILES: { html: false } });

  if (limpo == null || limpo == "") {
    return NextResponse.json({ text: "Sem descrição. Escreva algo!", status: 400 });
  }

  const idLivro = await prisma.livro.findFirst({ where: { titulo: body.titulo, criadorPrincialId: usuario.id } });

  if (idLivro == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  await prisma.livro.update({ where: { id: idLivro.id }, data: { descricao: limpo } });

  return NextResponse.json({ text: "Descricao alterada com sucesso" });
}
