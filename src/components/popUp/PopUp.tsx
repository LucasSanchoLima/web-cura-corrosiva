"use client";

import { usePopUpContext } from "@/contexts/popUpContext";
import Login from "./Login";
import Cadastro from "./Cadastro";
import MudarNome from "./MudarNome";
import EsqueciSenha from "./EsqueciSenha";
import AdicionarLivro from "./AdicionarLivro";
import AlterarTituloLivro from "./AlterarTituloLivro";
import { FontMaquina } from "@/fonts/fonts";
import AdicionarCapitulo from "./AdicionarCapitulo";
import AlterarNomeCapitulo from "./AlterarNomeCapitulo";

export default function PopUp() {
  const { qualPopUp, mudaEstadoPopUp, titulo } = usePopUpContext();

  if (!qualPopUp) {
    return <></>;
  }

  return (
    <div className="bg-black/80 fixed inset-0 z-30">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-zinc-900 w-11/12 sm:w-auto rounded-3xl relative flex justify-center  items-center flex-col">
          <button
            className="w-10 h-10 absolute top-2 right-2 text-center text-lg"
            onClick={() => {
              mudaEstadoPopUp(0);
            }}
          >
            X
          </button>
          <p className={`text-4xl text-center my-7 ${FontMaquina.className}`}>{titulo}</p>
          {qualPopUp == 1 ? <Login /> : <></>}
          {qualPopUp == 2 ? <Cadastro /> : <></>}
          {qualPopUp == 3 ? <EsqueciSenha /> : <></>}
          {qualPopUp == 4 ? <MudarNome /> : <></>}
          {qualPopUp == 5 ? <AdicionarLivro /> : <></>}
          {qualPopUp == 6 ? <AlterarTituloLivro /> : <></>}
          {qualPopUp == 7 ? <AdicionarCapitulo /> : <></>}
          {qualPopUp == 8 ? <AlterarNomeCapitulo /> : <></>}
        </div>
      </div>
    </div>
  );
}
