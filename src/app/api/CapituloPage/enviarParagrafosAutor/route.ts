"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";
import { UsuarioBanido } from "@/app/api/uteis/verificacoes";

//(token, paragrafos, livro, capitulo) -> resultado
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

  const verificacao = UsuarioBanido(usuario);

  if (verificacao !== true) {
    return verificacao;
  }

  const body = await request.json();
  const paragrafos = body.paragrafos;
  const nomeCapitulo = body.capitulo;
  const nomeLivro = body.livro;

  if (paragrafos == null || paragrafos == undefined || nomeCapitulo == null || nomeCapitulo == undefined || nomeLivro == null || nomeLivro == undefined) {
    return NextResponse.json({ text: "Valor não informado", status: 400 });
  }
}
