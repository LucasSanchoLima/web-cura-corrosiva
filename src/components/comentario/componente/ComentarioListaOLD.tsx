"use server";
import prisma from "@/utils/prisma";
import React from "react";
import ComentarioItem from "./ComentarioItem";

export interface ComentarioProps {
  id: string;
  texto: string;
  pontos: number;
  usuario: {
    nome: string | null;
  };
}

export default async function ComentarioLista({ arco }: { arco: number }) {
  const comentarios = await prisma.comentario.findMany({
    orderBy: { pontos: "desc" },
    where: { parteLivroIdURL: arco, NOT: { status: "EXCLUIDO" } },
    include: {
      usuario: true,
    },
  });

  return (
    <div>
      {comentarios.map((comentario) => {
        let comentarioSanitizado = {
          id: comentario.id,
          texto: comentario.texto,
          pontos: comentario.pontos,
          usuario: {
            nome: comentario.usuario.nome,
          },
        };

        return (
          <ComentarioItem
            key={comentario.id}
            comment={comentarioSanitizado}
          />
        );
      })}
    </div>
  );
}
