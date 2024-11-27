"use server";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  const body = await requisicao.json();

  if (body.nomeAutor == null) {
    return NextResponse.json({ text: "Autor não informado" }, { status: 400 });
  }

  const autor = await prisma.usuario.findUnique({ where: { nome: body.nomeAutor } });

  if (autor == null) {
    return NextResponse.json({ text: "Autor não encontrado" }, { status: 400 });
  }

  const livros = await prisma.livro.findMany({ where: { criadorPrincialId: autor!.id } });

  let nomeLivros: string[] = [];

  if (livros != null) {
    livros.map((livro) => {
      if (livro.status == "PUBLICO") {
        nomeLivros.push(livro.titulo);
      }
    });
  }

  return NextResponse.json({ autor: autor.nome, livros: nomeLivros, status: 200 });
}
