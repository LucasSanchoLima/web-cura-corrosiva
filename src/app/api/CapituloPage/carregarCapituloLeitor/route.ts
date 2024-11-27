"use server";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const requisicao = req;

  const body = await requisicao.json();

  if (body.autor == undefined || body.autor == null || body.livro == undefined || body.livro == null || body.capitulo == undefined || body.capitulo == null) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const autor = await prisma.usuario.findFirst({ where: { nome: body.autor } });

  if (autor == null) {
    return NextResponse.json({ text: "Autor não encontrado", status: 400 });
  }

  const livro = await prisma.livro.findFirst({ where: { titulo: body.livro, criadorPrincialId: autor!.id } });

  if (livro == null || livro.status != "PUBLICO") {
    return NextResponse.json({ text: "Livro não encontrado", status: 400 });
  }

  const capitulo = await prisma.capitulo.findFirst({ where: { livroId: livro.id } });

  if (capitulo == null || capitulo.status != "PUBLICO") {
    return NextResponse.json({ text: "Capítulo não encontrado", status: 400 });
  }

  const paragrafos = await prisma.paragrafos.findMany({ where: { capituloId: capitulo.id } });

  if (paragrafos.length == 0) {
    return NextResponse.json({ text: "Nada foi escrito ainda", status: 400 });
  }

  const textos: string[] = [];

  paragrafos.map((par) => {
    textos.push(par.texto);
  });

  return NextResponse.json({ text: "OK", textos: textos });
}
