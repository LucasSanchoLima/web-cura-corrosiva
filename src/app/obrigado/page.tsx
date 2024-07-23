"use client";

import { useMenuContext } from "@/contexts/menuContext";
import { RomanAntique } from "@/fonts/fonts";
import { inscreverNewsletter } from "@/server/server";
import { FontMaquina } from "@/fonts/fonts";
import { useState } from "react";

export default function Obrigado() {
  const { setNewsLetter } = useMenuContext();
  const [umavez, setUmaVez] = useState(false);
  const [popUpNewsLetter, setPopUpNewsLetter] = useState(true);

  if (!umavez) {
    setNewsLetter(true);
    setUmaVez(true);
  }

  async function newsletter(formData: FormData) {
    await inscreverNewsletter(formData);
    setPopUpNewsLetter(false);
  }

  return (
    <div>
      {popUpNewsLetter ? (
        <div className={`bg-zinc-800 py-1 rounded m-5 mt-10 sm:h-0 sm:invisible ` + FontMaquina.className}>
          <p className="text-center py-3 text-lg">Receber Novidades</p>

          <form
            action={newsletter}
            className="flex flex-col mx-2"
          >
            <p className="mb-1 ml-2 text-sm">E-mail:</p>
            <input
              className="rounded-full bg-white p-1 pl-3 text-zinc-900"
              type="email"
              name="email"
            />
            <input
              className="mt-3 bg-sky-800 rounded-full py-1 mb-1 px-5 mx-auto cursor-pointer"
              type="submit"
              value="Enviar"
            />
          </form>
        </div>
      ) : (
        <></>
      )}

      <div className={`max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl mt-10 ${RomanAntique.className}`}>
        <p className="my-2">Olá caro(a) leitor(a),</p>
        <p className="my-2">
          Espero que tenha gostado do primeiro de 6 arcos que compõe o livro, ainda temos muita coisa pela frente. Eu irei publicar cada arco assim que ele estiver pronto e todos que fizerem uma assinatura terão acesso à eles.
          Deste modo vocês não estarão apenas garantido acesso ao conteúdo, mas também contribuindo para que a obra tenha uma melhor qualidade, afinal, será com esse dinheiro que irei contratar revisores, tradutores e ilustradores.{" "}
        </p>

        <p className="my-2">Lembrando que se você conhecer alguém que talvez goste do livro, por favor, recomende o livro para ela. Talvez isso possa não parecer fazer tanta diferença, mas eu lhe garanto que faz.</p>
        <p className="my-2">
          Para finalizar eu gostaria de te agredecer mais uma vez pelo seu tempo e espero que você tenha gostado do livro tanto quanto eu estou gostando de escrevê-lo. Espero que logo logo a gente se veja novamente em mais um maravilhoso arco.
        </p>
      </div>
    </div>
  );
}
