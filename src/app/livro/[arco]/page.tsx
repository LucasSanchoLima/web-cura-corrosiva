import Leitor from "@/components/leitor/leitor";
import { Scroll } from "@/components/leitor/Scroll";
import { RomanAntique} from "@/fonts/fonts";
import {ArcoToNumero} from "@/components/leitor/variaveis"
import LeitorBotton from "@/components/leitor/botton"


export default async function Livro({ params }: {params:{arco:string}}) {
  const { arco } = params;
  const livroHtml = (await import(`@/html/${arco}.html`)).default;

  return (
    <div className={RomanAntique.className + " select-none text-zinc-300 max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl"}>
      <Scroll pagina={ArcoToNumero[arco]} />
      <Leitor texto={livroHtml} />
      {/* Parte de baixo */}
      <LeitorBotton arco={arco} />
    </div>
  );
}
