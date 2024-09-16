"use client";

import { useUserContext } from "@/contexts/userContext";
import ComentarioLogin from "./componente/login";
import { CriarNome } from "./componente/criarNome";
import { FormularioComentario } from "./componente/formulario";

export function PreFormulario() {
  const { user, nomeUsuario, verificado, atualizarInfo, verificarEmail } = useUserContext();

  if (user == null) {
    return (
      <div className="w-100 rounded-md bg-zinc-900 p-3 my-10 text-center text-xl sm:text-2xl ">
        <p className="pt-3">Querendo Comentar?</p>
        <p className="p-3">Faça o Login para continuar!</p>
        <ComentarioLogin />
      </div>
    );
  }

  if (nomeUsuario == null) {
    atualizarInfo();
    return <CriarNome />;
  }

  if (verificado == false) {
    return (
      <div className="w-100 rounded-md bg-zinc-900 flex flex-col items-center justify-center p-3 my-10 text-center">
        <p className="p-2">Quase pronto!</p>
        <p>Agora só precisamos verificar seu email!</p>
        <button
          onClick={() => {
            verificarEmail(user);
          }}
          className="py-2 px-4 my-5 rounded-full bg-sky-900"
        >
          Verificar
        </button>
      </div>
    );
  }

  return <FormularioComentario />;
}
