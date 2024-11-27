"use client";
import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import { requesteMudarNome } from "@/components/funcoes/funcoes";
import { usePopUpContext } from "@/contexts/popUpContext";
import { useState } from "react";

export default function MudarNome() {
  const { textoBotao, mudaEstadoPopUp } = usePopUpContext();
  const { user, atualizarInfo } = useUserContext();
  const [erro, setErro] = useState("");

  async function criarNome(formData: FormData) {
    const resultado = await requesteMudarNome(await user!.getIdToken(), String(formData.get("nome")));

    if (resultado.status == 400) {
      setErro(resultado.text);
      return;
    }

    mudaEstadoPopUp(0);
    atualizarInfo();
  }

  return (
    <div className=" relative flex justify-center  items-center flex-col">
      <form
        action={criarNome}
        className=" my-5 mx-20 flex flex-col"
      >
        <p className="mb-1 ml-2 text-sm sm:text-base">Nome</p>
        <input
          type="text"
          name="nome"
          className="rounded-full sm:w-96 h-7 sm:h-10 bg-white p-3 text-zinc-900 flex flex-row justify-center"
        ></input>
        {erro != "" ? <p className="p-2 mt-3 rounded-md text-base  text-red-800 border-red-950 border-2">{erro}</p> : <></>}
        <input
          type="submit"
          className={`mx-auto my-5 px-5 sm:py-1 cursor-pointer rounded-full text-xl sm:text-2xl ${FontMaquina.className} bg-sky-800`}
          value={textoBotao}
        ></input>
      </form>
    </div>
  );
}
