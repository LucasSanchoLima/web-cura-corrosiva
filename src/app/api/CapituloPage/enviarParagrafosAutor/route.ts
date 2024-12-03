"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import { jaCadastrado } from "@/server/loginCadastro";
import prisma from "@/utils/prisma";
import { StringURL, UsuarioBanido, ValorNull } from "@/app/api/uteis/verificacoes";
import { isBooleanObject } from "util/types";

export interface ParagrafoProps {
  texto: string;
  id: string;
  index: number;
}

//(token, paragrafos, livro, capitulo) -> resultado
export async function POST(req: Request) {
  const request = req;
  let resultadoVerificacao;

  resultadoVerificacao = await ValorNull(request.headers.get("authorization"), "Token dado pelo Cliente");
  if (!isBooleanObject(resultadoVerificacao)) {
    return resultadoVerificacao;
  }

  const token = request.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  // jaCadastrado(verifiToken);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  resultadoVerificacao = await ValorNull(usuario, "Valor do Usuário dentro do BD");
  if (!isBooleanObject(resultadoVerificacao)) {
    return resultadoVerificacao;
  }

  resultadoVerificacao = await UsuarioBanido(usuario);
  if (!isBooleanObject(resultadoVerificacao)) {
    return resultadoVerificacao;
  }

  const body = await request.json();
  let paragrafos: ParagrafoProps[] = body.paragrafos;
  let nomeCapitulo = body.capitulo;
  let nomeLivro = body.livro;

  const valores = [paragrafos, nomeCapitulo, nomeLivro];
  const nomes = ["Valor de Paragrafos dado pelo Cliente", "Valor de Nome do Capitulo dado pelo Cliente", "Valor de Nome do Livro dado pelo Cleinte"];

  valores.map(async (valor, index) => {
    resultadoVerificacao = await ValorNull(valor, nomes[index]);
    if (!isBooleanObject(resultadoVerificacao)) {
      return resultadoVerificacao;
    }
  });

  nomeCapitulo = StringURL(nomeCapitulo);
  nomeLivro = StringURL(nomeLivro);

  const livro = await prisma.livro.findFirst({ where: { criadorPrincialId: usuario!.id, titulo: nomeLivro } });

  resultadoVerificacao = await ValorNull(livro, "Valor do Livro no BD");
  if (!isBooleanObject(resultadoVerificacao)) {
    return resultadoVerificacao;
  }

  const capitulo = await prisma.capitulo.findFirst({ where: { livroId: livro!.id, titulo: nomeCapitulo } });

  resultadoVerificacao = await ValorNull(capitulo, "Valor do Capitulo no BD");
  if (!isBooleanObject(resultadoVerificacao)) {
    return resultadoVerificacao;
  }

  await RegistrarParagrafos(paragrafos, capitulo!.id);

  await DeletarDiferencaParagrafos(await prisma.paragrafos.findMany({ where: { capituloId: capitulo!.id }, orderBy: { index: "asc" } }), paragrafos);

  return NextResponse.json({ text: "ok" });
}

async function RegistrarParagrafos(paragrafos: ParagrafoProps[], IdCapitulo: string) {
  paragrafos.forEach(async (paragrafo) => {
    if (paragrafo.texto != "") {
      if (paragrafo.id == "") {
        await prisma.paragrafos.create({ data: { texto: paragrafo.texto, capituloId: IdCapitulo, index: paragrafo.index } });
      } else {
        // ERRO!!!!!!
        // Pode ocorrer de um dos parágrafos não estar com o id correto.
        await prisma.paragrafos.update({ data: { index: paragrafo.index }, where: { id: paragrafo.id } });
      }
    }
  });
}

async function DeletarDiferencaParagrafos(paragrafosDB: any, paragrafosUsu: ParagrafoProps[]) {
  let x: number = 0;
  let y: number;
  let id: string;
  let encontrado: boolean;
  while (x < paragrafosDB.length) {
    id = paragrafosDB[x].id;
    encontrado = false;
    y = 0;
    while (y < paragrafosUsu.length) {
      if (id == paragrafosUsu[y].id) {
        encontrado = true;
        break;
      }
      y += 1;
    }
    if (!encontrado) {
      await prisma.paragrafos.delete({ where: { id: id } });
    }
    x += 1;
  }
}
