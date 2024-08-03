"use server";

import prisma from "./prisma";

export async function atualizarPonto(comentarioId: string) {
  const pontos = await prisma.pontosComentario.groupBy({ where: { comentarioId: { equals: comentarioId } }, by: ["comentarioId"], _sum: { ponto: true } });
  // console.log(pontos[0]._sum.ponto);
  await prisma.comentario.update({ where: { id: comentarioId }, data: { pontos: Number(pontos[0]._sum.ponto) } });
}
