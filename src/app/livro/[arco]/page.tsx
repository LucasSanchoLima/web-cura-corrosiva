// "use client";

import Leitor from "@/components/leitor/leitor";
import { RomanAntique, FontMaquina } from "@/fonts/fonts";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";

interface LivroProps {
  params: { arco: string };
}

const ArcoToNumero: { [key: string]: number } = {
  Cap1: 0,
  Cap2: 1,
  Cap2P2: 2,
  Cap2P3: 3,
  Cap3: 4,
  Cap3P2: 5,
  Cap3P3: 6,
  Cap3P4: 7,
  Cap3P5: 8,
};

const numerToText = ["Parte 1 / 1", "Parte 1 / 3", "Parte 2 / 3", "Parte 3 / 3", "Parte 1 / 5", "Parte 2 / 5", "Parte 3 / 5", "Parte 4 / 5", "Parte 5 / 5"];

const numeroToNomeArco = ["Cap1", "Cap2", "Cap2P2", "Cap2P3", "Cap3", "Cap3P2", "Cap3P3", "Cap3P4", "Cap3P5"];

export default async function Livro({ params }: LivroProps) {
  const { arco } = params;
  const livroHtml = (await import(`@/html/${arco}.html`)).default;

  function arcoAnterior() {
    const resultado = ArcoToNumero[arco] - 1;

    if (resultado < 0) {
      return "/livro";
    }

    return "/livro/" + numeroToNomeArco[resultado];
  }

  function proximoArco() {
    const resultado = ArcoToNumero[arco] + 1;

    if (resultado > 8) {
      return "/livro";
    }

    return "/livro/" + numeroToNomeArco[resultado];
  }

  return (
    <div className={RomanAntique.className + " text-zinc-300 max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl"}>
      <Leitor texto={livroHtml} />
      <div className="flex flex-row items-center mt-10">
        <div className="w-1/3 flex justify-start">
          <Link
            className="bg-zinc-900 p-5 rounded-xl"
            href={arcoAnterior()}
          >
            <GrPrevious />
          </Link>
        </div>
        <div className="w-1/3 flex justify-center">
          <p className={`text-center bg-zinc-900 indent-0 rounded p-5 ${FontMaquina.className}`}>{numerToText[ArcoToNumero[arco]]}</p>
        </div>
        <div className="w-1/3 flex justify-end">
          <Link
            className="bg-zinc-900 p-5 rounded-xl"
            href={proximoArco()}
          >
            <GrNext />
          </Link>
        </div>
      </div>
    </div>
  );
}
