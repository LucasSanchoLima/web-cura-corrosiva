import { FontMaquina } from "@/fonts/fonts";
import Link from "next/link";

export default function Livro() {
  return (
    <div className={`w-full flex items-center flex-col text-center ${FontMaquina.className}`}>
      <div className="flex w-full md:w-auto items-center rounded-lg md:mt-10 flex-col bg-zinc-900">
        <p className="p-7 w-full  text-4xl bg-zinc-800">Arco 1</p>

        <p className="md:m-3 md:mt-10 p-5 w-full md:w-96 bg-zinc-800 md:rounded text-xl">Capítulo 1</p>

        <div className="flex flex-row">
          <Link
            href="/livro/Cap1"
            className="m-5 p-5 rounded-lg bg-sky-900"
          >
            <p className="text-lg">Um pequeno desvio</p>
          </Link>
        </div>
        <div className="w-full md:w-auto">
          <p className="md:m-3 md:mt-10 p-5 w-full md:w-auto bg-zinc-800 md:rounded text-xl">Capítulo 2</p>
          <div className="flex flex-col items-center md:flex-row">
            <Link
              href="/livro/Cap2"
              className="m-5 p-5 w-44 rounded-lg bg-sky-950"
            >
              <div>
                <p>Parte 1</p>
                <p className="text-lg">Decisões</p>
              </div>
            </Link>
            <Link
              href="/livro/Cap2P2"
              className="m-5 p-5 w-44 rounded-lg bg-sky-950"
            >
              <div>
                <p>Parte 2</p>
                <p className="text-lg">Consequências</p>
              </div>
            </Link>
            <Link
              href="/livro/Cap2P3"
              className="m-5 p-5 w-44 rounded-lg bg-sky-950"
            >
              <div>
                <p>Parte 3</p>
                <p className="text-lg">Preparativos</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <p className="md:m-3 md:mt-10 p-5 w-full md:w-auto bg-zinc-800 md:rounded text-xl">Capítulo 3</p>
          <div>
            <div className="flex flex-col items-center md:flex-row">
              <Link
                href="/livro/Cap3"
                className="m-5 p-5 w-60 rounded-lg bg-sky-950"
              >
                <div>
                  <p>Parte 1</p>
                  <p className="text-lg">A cidade com Muralha</p>
                </div>
              </Link>
              <Link
                href="/livro/Cap3P2"
                className="m-5 p-5 w-60 rounded-lg bg-sky-950"
              >
                <div>
                  <p>Parte 2</p>
                  <p className="text-lg">A casa sem barricadas</p>
                </div>
              </Link>
              <Link
                href="/livro/Cap3P2"
                className="m-5 p-5 w-60 rounded-lg bg-sky-950"
              >
                <div>
                  <p>Parte 3</p>
                  <p className="text-lg">O único objetivo</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-normal md:flex-row md:justify-around">
              <Link
                href="/livro/Cap3P4"
                className="m-5 p-5 w-60 rounded-lg bg-sky-950"
              >
                <div>
                  <p>Parte 4</p>
                  <p className="text-lg">Seu maior pesadelo</p>
                </div>
              </Link>
              <Link
                href="/livro/Cap3P5"
                className="m-5 p-5 w-60 rounded-lg bg-sky-950"
              >
                <div>
                  <p>Parte 5</p>
                  <p className="text-lg">Sua pior realidade</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
