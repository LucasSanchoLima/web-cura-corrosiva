"use client";

import ComentarioBotton from "./componente/botton";
import { useComment } from "./componente/ComentarioItem";
import ComentarioTresPontos from "./componente/tresPontos";
import { trasformarTextoCom } from "./funcoes";

export function Comentario() {
  const { comment } = useComment();
  const textoTrans = trasformarTextoCom(comment.texto);

  return (
    <div className="bg-zinc-900 p-3 my-10 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="rounded-full bg-zinc-950 text-center w-12 h-12 flex flex-col">
            <p className={`my-auto ${comment.usuario.nome![0].search(/[a-z]/) < 0 ? "pt-1" : ""} select-none`}>{comment.usuario.nome![0]}</p>
          </div>
          <p className="p-3 max-w-44 sm:max-w-max overflow-hidden text-nowrap">{comment.usuario.nome}</p>
        </div>
        <ComentarioTresPontos />
      </div>
      <div className="text-xl sm:text-2xl p-1 sm:p-3 leading-tight">
        <p dangerouslySetInnerHTML={{ __html: textoTrans }}></p>
      </div>
      <ComentarioBotton
        pontos={comment.pontos}
        idComentario={comment.id}
      />
    </div>
  );
}
