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

  // verificação da existência das variáveis
  if (body.arco == null) {
    return NextResponse.json({ text: "Arco não informado" }, { status: 400 });
  }
  let inicio = 0;
  let quantidade = 50;
  if (body.inicio != null) {
    inicio = Number(body.inicio);
  }
  if (body.qtd != null) {
    quantidade = Number(body.qtd);
  }

  //Sanitização do Usuario
  if (quantidade > 50) {
    quantidade = 50;
  }

  // Pegar informações do bando de dados
  const comentarios = await prisma.comentario.findMany({
    skip: inicio,
    take: quantidade,
    orderBy: { pontos: "desc" },
    where: { parteLivroIdURL: Number(body.arco), NOT: { status: "EXCLUIDO" } },
    include: {
      usuario: true,
    },
  });

  // Sanitizar os dados

  // Interação com BD
  let arrayComentario: ComentarioProps[] = [];

  comentarios.map((comentario) => {
    let comentarioSanitizado = {
      id: comentario.id,
      texto: comentario.texto,
      pontos: comentario.pontos,
      usuario: {
        nome: comentario.usuario.nome,
      },
    };
    arrayComentario.push(comentarioSanitizado);
  });

  // console.log(arrayComentario)

  return NextResponse.json({ comentarios: arrayComentario });
}
