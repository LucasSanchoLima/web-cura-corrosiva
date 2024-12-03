"use server";
import { NextResponse } from "next/server";
import { authAdmin } from "@/utils/firebaseAdmin";
import prisma from "@/utils/prisma";
import { StringURL, UsuarioBanido, ValorNull } from "@/app/api/uteis/verificacoes";
import { isBooleanObject } from "util/types";

export interface ParagrafoProps {
  texto: string;
  id: string;
  index: number;
}

//(token, livro, capitulo) -> resultado
export async function POST(req: Request) {
  const request = req;
  let valorValido: boolean;

  valorValido = await ValorNull(request.headers.get("authorization"), "Token dado pelo Cliente");
  if (!valorValido) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const token = request.headers.get("authorization")!.split(" ")[1];
  const verifiToken = await authAdmin.verifyIdToken(token!);

  const usuario = await prisma.usuario.findUnique({ where: { email: verifiToken.email } });

  valorValido = await ValorNull(usuario, "Valor do Usuário dentro do BD");
  if (!valorValido) {
    return NextResponse.json({ text: "", status: 400 });
  }

  valorValido = await UsuarioBanido(usuario);
  if (!valorValido) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const body = await request.json();
  let nomeCapitulo = body.capitulo;
  let nomeLivro = body.livro;

  const valores = [nomeCapitulo, nomeLivro];
  const nomes = ["Valor de Nome do Capitulo dado pelo Cliente", "Valor de Nome do Livro dado pelo Cleinte"];

  for (var index = 0; index < valores.length; index++) {
    valorValido = await ValorNull(valores[index], nomes[index]);
    if (!valorValido) {
      return NextResponse.json({ text: "", status: 400 });
    }
  }

  nomeCapitulo = await StringURL(nomeCapitulo);
  nomeLivro = await StringURL(nomeLivro);

  const livro = await prisma.livro.findFirst({ where: { criadorPrincialId: usuario!.id, titulo: nomeLivro } });

  valorValido = await ValorNull(livro, "Valor do Livro no BD");
  if (!valorValido) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const capitulo = await prisma.capitulo.findFirst({ where: { livroId: livro!.id, titulo: nomeCapitulo } });

  valorValido = await ValorNull(capitulo, "Valor do Capitulo no BD");
  if (!valorValido) {
    return NextResponse.json({ text: "", status: 400 });
  }

  const paragrafos = await prisma.paragrafos.findMany({ orderBy: { index: "asc" }, where: { capituloId: capitulo!.id } });

  var paragrafosSanitisado: ParagrafoProps[] = [];
  var x = 0;

  while (x < paragrafos.length) {
    paragrafosSanitisado.push({ id: paragrafos[x].id, index: paragrafos[x].index, texto: paragrafos[x].texto });
    x += 1;
  }

  return NextResponse.json({ paragrafos: paragrafosSanitisado, status: 200 });
}
