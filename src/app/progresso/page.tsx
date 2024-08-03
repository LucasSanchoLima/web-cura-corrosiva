import {FontMaquina} from "@/fonts/fonts"

export default function Progresso() {
  return <div className={`p-5 mt-10 ${FontMaquina.className}`}>
    <p className="md:text-5xl text-3xl text-center p-3">Arco 2</p>
    <div className="w-100 md:h-10 h-6 md:mx-20 bg-zinc-800  rounded-full">
      <div className="w-1/12 md:h-10 h-6 bg-sky-900 rounded-l-full"></div>
    </div>
    <p className="md:text-2xl text-xl text-center p-3 pb-1 md:pb-2 mt-5">Escrita</p>
    <div className="w-100 md:h-7 h-4 md:mx-20 bg-zinc-800  rounded-full">
      <div className="w-1/6 md:h-7 h-4 bg-sky-900 rounded-l-full"></div>
    </div>
    <p className="md:text-2xl text-xl  text-center p-3 pb-1 md:pb-2 mt-2">Revisão</p>
    <div className="w-100 md:h-7 h-4 md:mx-20 bg-zinc-800  rounded-full">
      <div className="w-0 md:h-7 h-4 bg-sky-900 rounded-l-full"></div>
    </div>
  </div>;
}
