"use client";

import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { excluirComentario, denunciarComentario } from "../../funcoes/funcoes";
import { useComment } from "./ComentarioItem";
import { useArrayComentarioContext } from "@/contexts/arrayComentarioContext";
import { usePopUpContext } from "@/contexts/popUpContext";

export default function ComentarioTresPontos() {
  const [menuComentario, setMenuComentario] = useState(false);
  const { nomeUsuario, user } = useUserContext();
  const { comment, setIsEditing } = useComment();
  const { recarregarComentarios } = useArrayComentarioContext();
  const { mudaEstadoPopUp } = usePopUpContext();

  return (
    <div>
      <button
        className="p-1"
        onClick={() => {
          setMenuComentario(!menuComentario);
        }}
      >
        <BsThreeDots />
      </button>
      {menuComentario ? (
        <div className="relative right-24 sm:right-28  text-lg sm:text-xl">
          <div className={`absolute bg-zinc-800 p-3 rounded-md flex flex-col ${FontMaquina.className}`}>
            {comment.usuario.nome == nomeUsuario ? (
              <>
                <button
                  className="p-1 m-1"
                  onClick={() => setIsEditing && setIsEditing(true)}
                >
                  Editar
                </button>
                <button
                  className="p-1 m-1"
                  onClick={async () => {
                    await excluirComentario(await user!.getIdToken(), comment.id);
                    setMenuComentario(false);
                    recarregarComentarios();
                  }}
                >
                  Excluir
                </button>
              </>
            ) : (
              <button
                onClick={async () => {
                  if (user == null) {
                    setMenuComentario(false);
                    mudaEstadoPopUp(1);
                  } else {
                    await denunciarComentario(await user!.getIdToken(), comment.id);
                    setMenuComentario(false);
                  }
                }}
                className="p-1 m-1"
              >
                Denunciar
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
