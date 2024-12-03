"use server";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { StringURL, ValorNull } from "../../uteis/verificacoes";

export async function POST(req: Request) {
  const requisicao = req;
  let resultadoVerificacao;
  let valoresVerificacao;
  let nomeVerificacao;

  const body = await requisicao.json();

  valoresVerificacao = [body.autor, body.livro, body.capitulo];
  nomeVerificacao = ["Valor de Autor dado pelo Usuário", "Valor de Livro dado pelo Usuário", "Valor de Capítulo dado pelo Usuário"];

  valoresVerificacao.map(async (valor, index) => {
    resultadoVerificacao = await ValorNull(valor, nomeVerificacao[index]);
    if (resultadoVerificacao !== true) {
      return resultadoVerificacao;
    }
  });

  body.autor = await StringURL(body.autor);
  body.livro = await StringURL(body.livro);
  body.capitulo = await StringURL(body.capitulo);

  const autor = await prisma.usuario.findFirst({ where: { nome: body.autor } });

  if (autor == null) {
    return NextResponse.json({ text: "Autor não encontrado", status: 400 });
  }

  const livro = await prisma.livro.findFirst({ where: { titulo: body.livro, criadorPrincialId: autor!.id } });

  if (livro == null || livro.status != "PUBLICO") {
    return NextResponse.json({ text: "Livro não encontrado", status: 400 });
  }

  const capitulo = await prisma.capitulo.findFirst({ where: { livroId: livro.id, titulo: body.capitulo } });

  if (capitulo == null || capitulo.status != "PUBLICO") {
    return NextResponse.json({ text: "Capítulo não encontrado", status: 400 });
  }

  const paragrafos = await prisma.paragrafos.findMany({ where: { capituloId: capitulo.id }, orderBy: { index: "asc" } });

  if (paragrafos.length == 0) {
    return NextResponse.json({ text: "Nada foi escrito ainda", status: 400 });
  }

  const textos: string[] = [];

  paragrafos.map((par) => {
    textos.push(par.texto);
  });

  return NextResponse.json({ paragrafos: textos, status: 200 });
}
