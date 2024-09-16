import Leitor from "@/components/leitor/leitor";
import { Scroll } from "@/components/leitor/Scroll";
import { RomanAntique } from "@/fonts/fonts";
import { ArcoToNumero } from "@/components/leitor/variaveis";
import LeitorBotton from "@/components/leitor/botton";
import { PreFormulario } from "@/components/comentario/preFormulario";
import ComentarioLista from "@/components/comentario/componente/ComentarioLista";
import { ArrayComentarioContextProvider } from "@/contexts/arrayComentarioContext";

export default async function Livro({ params }: { params: { arco: string } }) {
  const { arco } = params;
  const livroHtml = (await import(`@/html/${arco}.html`)).default;

  return (
    <div className={RomanAntique.className + " text-zinc-300 max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl sm:text-3xl"}>
      <Scroll pagina={ArcoToNumero[arco]} />
      <div className="select-none">
        <Leitor texto={livroHtml} />
      </div>
      {/* Parte de baixo */}
      <LeitorBotton />
      {/* Aba de Comentarios */}
      <div className="indent-0">
        <p className="w-100 bg-zinc-900 p-3 my-10 text-center">Comentarios</p>
        <ArrayComentarioContextProvider arco={ArcoToNumero[arco]}>
          <PreFormulario />
          <ComentarioLista arco={ArcoToNumero[arco]} />
        </ArrayComentarioContextProvider>
      </div>
    </div>
  );
}
