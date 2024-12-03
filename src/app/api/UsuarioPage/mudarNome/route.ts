"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";
import { UsuarioBanido } from "@/app/api/uteis/verificacoes";
import { isBooleanObject } from "util/types";

const nomesIndisponiveis = ["Davi", "Alice", "Natham", "Noah", "Daniel", "Guilherme", "Catarina", "Miguel", "Cura Corrosiva", "cura corrosiva", "curacorrosiva", "CuraCorrosiva", "Tagarela", "Muralha", "Sangrento", "Visitante"];

export async function POST(req: Request) {
  const request = req;
  let verificacao;

  if (request.headers.get("authorization") == null) {
    console.error("authorization is null");
    return;
  }

  const token = request.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  // jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  verificacao = await UsuarioBanido(usuario);

  if (!isBooleanObject(verificacao)) {
    return verificacao;
  }

  // if (usuario!.status == "BANIDO" || usuario!.status == "SHADOWBAN") {
  //   return NextResponse.json({ text: "Conta invalido", status: 400 });
  // }

  let nome = await request.json();
  nome = nome.nome;

  if (nome.length < 3) {
    return NextResponse.json({ text: "Seu nome tem que ter pelo menos 3 letras", status: 400 });
  }

  if (nome.length > 20) {
    return NextResponse.json({ text: "Seu nome tem que ser menor do que 20 letras", status: 400 });
  }

  if (nome[0] == " ") {
    return NextResponse.json({ text: "Não comece seu nome com um espaço", status: 400 });
  }

  nome = nome.replaceAll(" ", "_");

  const nomeBackup = nome;

  nome = nome.replaceAll("-", "");

  if (nome.search(/\W/) != -1) {
    return NextResponse.json({ text: "Não utilize caracteres especiais", status: 400 });
  }

  if ((await prisma.usuario.findUnique({ where: { nome: nomeBackup } })) != null) {
    return NextResponse.json({ text: "Nome não disponível", status: 400 });
  }

  if (nomesIndisponiveis.includes(nomeBackup)) {
    return NextResponse.json({ text: "Nome não disponível", status: 400 });
  }

  const resultado = await prisma.usuario.update({ where: { email: verifiToken.email }, data: { nome: nomeBackup } });

  return NextResponse.json({ resultado: "Ok" });
}
