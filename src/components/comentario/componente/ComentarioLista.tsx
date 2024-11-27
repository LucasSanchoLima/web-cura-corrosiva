"use client";

import ComentarioItem from "./ComentarioItem";
import { useArrayComentarioContext } from "@/contexts/arrayComentarioContext";

export interface ComentarioProps {
  id: string;
  texto: string;
  pontos: number;
  usuario: {
    nome: string | null;
  };
}

export default function ComentarioLista({ arco }: { arco: number }) {
  const { comentarios, recarregarComentarios, primeiraVez } = useArrayComentarioContext();

  if (primeiraVez) {
    recarregarComentarios();
  }

  return (
    <div>
      {comentarios.map((comentario) => {
        return (
          <ComentarioItem
            key={comentario.id}
            comment={comentario}
          />
        );
      })}
    </div>
  );
}
