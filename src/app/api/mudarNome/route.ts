"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";

const nomesIndisponiveis = ["Davi", "Alice", "Natham", "Noah", "Daniel", "Guilherme", "Catarina", "Miguel", "Cura Corrosiva", "cura corrosiva", "curacorrosiva", "CuraCorrosiva", "Tagarela", "Muralha", "Sangrento"];

export async function POST(req: Request, res: Response) {
  const request = req;

  if (request.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  let nome = await request.json();
  nome = nome.nome;

  console.log(nome);

  if (nome.length < 3) {
    return NextResponse.json({ resultado: "erro", erro: "Seu nome tem que ter pelo menos 3 letras" });
  }

  if (nome.length > 20) {
    return NextResponse.json({ resultado: "erro", erro: "Seu nome tem que ser menor do que 20 letras" });
  }

  if (nome[0] == " ") {
    return NextResponse.json({ resultado: "erro", erro: "Não comece seu nome com um espaço" });
  }

  const nomeBackup = nome;

  nome = nome.replaceAll("-", "");
  nome = nome.replaceAll("_", "");
  nome = nome.replaceAll(" ", "");

  // console.log(nome);
  // console.log(nomeBackup);

  if (nome.search(/\W/) != -1) {
    return NextResponse.json({ resultado: "erro", erro: "Não utilize caracteres especiais" });
  }

  if ((await prisma.usuario.findUnique({ where: { nome: nomeBackup } })) != null) {
    return NextResponse.json({ resultado: "erro", erro: "Nome não disponível" });
  }

  if (nomesIndisponiveis.includes(nomeBackup)) {
    return NextResponse.json({ resultado: "erro", erro: "Nome não disponível" });
  }

  const token = request.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  jaCadastrado(verifiToken);

  const resultado = await prisma.usuario.update({ where: { email: verifiToken.email }, data: { nome: nomeBackup } });

  console.log(resultado);

  return NextResponse.json({ resultado: "Ok" });
}
