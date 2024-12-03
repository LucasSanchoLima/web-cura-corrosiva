"use server";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export interface ComentarioProps {
  id: string;
  texto: string;
  pontos: number;
  usuario: {
    nome: string | null;
  };
}

export async function POST(req: Request) {
  const requisicao = req;

  const body = await requisicao.json();

  console.log(body.autor, body.Titulo);

  body.autor = body.autor.replaceAll(" ", "_");
  body.Titulo = body.Titulo.replaceAll(" ", "_");

  const autor = await prisma.usuario.findFirst({ where: { nome: body.autor } });

  if (autor == null) {
    return NextResponse.json({ text: "Autor não encontrado", status: 400 });
  }

  const resultado = await prisma.livro.findFirst({ where: { titulo: body.Titulo, criadorPrincialId: autor!.id } });

  if (resultado == null) {
    return NextResponse.json({ text: "Livro não encontrado", status: 400 });
  }

  console.log(resultado.id);
  const capitulos = await prisma.capitulo.findMany({ where: { livroId: resultado.id } });
  console.log(capitulos);

  const titulos: String[] = [];

  capitulos.map((cap) => {
    titulos.push(cap.titulo);
  });

  console.log(titulos);
  return NextResponse.json({ text: "OK", capitulos: titulos, descricao: resultado.descricao, status: 200 });
}
