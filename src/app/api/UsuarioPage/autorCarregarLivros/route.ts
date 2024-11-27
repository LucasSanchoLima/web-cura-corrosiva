"use server";
import { jaCadastrado } from "@/server/loginCadastro";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  if (requisicao.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = requisicao.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  const livros = await prisma.livro.findMany({ where: { criadorPrincialId: usuario!.id } });

  let nomeLivros: string[] = [];
  let statusLivro: string[] = [];

  if (livros != null) {
    livros.map((livro) => {
      nomeLivros.push(livro.titulo);
      statusLivro.push(livro.status);
    });
  }

  return NextResponse.json({ livros: nomeLivros, statusLivro: statusLivro, status: 200 });
}
