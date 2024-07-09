import { RomanAntique } from "@/fonts/fonts";
import Link from "next/link";

export default function Obrigado() {
  return (
    <div className={`max-w-6xl mx-auto mb-20 text-justify p-3 indent-4 sm:indent-8 text-2xl mt-10 ${RomanAntique.className}`}>
      <p className="my-2">Olá caro(a) leitor(a),</p>
      <p className="my-2">
        Espero que tenha gostado do primeiro de 6 arcos que compõe o livro, ainda temos muita coisa pela frente. Eu irei publicar cada arco assim que ele estiver pronto e todos que estiverem me ajudando com pelo menos R$8,00 terão acesso à ele. Então se
        você puder me ajudar entre no link do{" "}
        <Link
          className="text-sky-400"
          target="_blank"
          href="https://www.catarse.me/pt/projects/179878/subscriptions/start?reward_id=318009"
        >
          catarse
        </Link>
        .
      </p>
      <p className="my-2">Lembrando que se você conhecer alguém que talvez goste do livro, por favor, envie o meu site para essa pessoa, recomende o livro para ela. Talvez isso possa não parecer fazer tanta diferença, mas eu lhe garanto que faz.</p>
      <p className="my-2">
        Para finalizar eu gostaria de te agredecer mais uma vez pelo seu tempo e espero que você tenha gostado do livro tanto quanto eu estou gostando de escrevê-lo. Espero que logo logo a gente se veja novamente em mais um maravilhoso arco.
      </p>
    </div>
  );
}
