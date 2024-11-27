"use client";

import { usePopUpContext } from "@/contexts/popUpContext";
import { useUserContext } from "@/contexts/userContext";
import { useEffect, useState } from "react";
import { carregarUpVote, enviarUpVote } from "../../funcoes/funcoes";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FontMaquina } from "@/fonts/fonts";

export default function ComentarioBotton({ pontos, idComentario }: { pontos: number; idComentario: String }) {
  const { user } = useUserContext();
  const [mais, setMais] = useState(false);
  const [menos, setMenos] = useState(false);
  const { mudaEstadoPopUp } = usePopUpContext();
  const [primeiraVez, setPrimeiraVez] = useState(true);
  const [pontuacao, setPontuacao] = useState(pontos);

  async function carregarAntigoUpvote() {
    if (user == null) {
      return;
    }

    const token = await user.getIdToken();
    const resultado = await carregarUpVote(token, idComentario);

    if (resultado.upvote == 0) {
      return;
    }
    if (resultado.upvote == 1) {
      setPontuacao(pontuacao - 1);
      setMais(true);
      setMenos(false);
    } else {
      if (resultado.upvote == -1) {
        setPontuacao(pontuacao + 1);
        setMais(false);
        setMenos(true);
      }
    }
  }

  if (primeiraVez) {
    setPrimeiraVez(false);
    carregarAntigoUpvote();
  }

  async function upvote(id: String, positivo: boolean) {
    if (user == null) {
      mudaEstadoPopUp(1);
      return;
    }

    const token = await user!.getIdToken();
    await enviarUpVote(token, positivo, id);
  }

  return (
    <div className="flex flex-row justify-between sm:justify-normal">
      <div className="flex flex-row items-center">
        <button
          className="p-2"
          onClick={() => {
            upvote(idComentario, true);
            setMais(!mais);
            setMenos(false);
          }}
        >
          <FaPlus
            size={18}
            color={mais ? "#075985" : "#082f49"}
          />
        </button>
        <p className={`px-4 text-lg sm:text-xl ${FontMaquina.className}`}>{String(pontuacao + Number(mais) - Number(menos))}</p>
        <button
          className="p-2"
          onClick={() => {
            upvote(idComentario, false);
            setMenos(!menos);
            setMais(false);
          }}
        >
          <FaMinus
            size={18}
            color={menos ? "#075985" : "#082f49"}
          />
        </button>
      </div>
      {/* <button className={`text-lg sm:text-xl ml-10 p-2 ${FontMaquina.className}`}>Respostas</button> */}
    </div>
  );
}
