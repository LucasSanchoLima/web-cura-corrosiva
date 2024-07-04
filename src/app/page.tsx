import { BotaoLer } from "@/components/botoes/Botoes";
import TextoSimples from "@/components/textos/Textos";

export default function Home() {
  return (
    <main className="h-screen  w-full">
      <div className="w-full  flex flex-col sm:flex-row my-10">
        <div className=" flex justify-center items-center flex-col w-full sm:w-2/5 my-20 sm:my-auto">
          <div className="w-56 bg-zinc-700 h-80 m-4 flex justify-center">
            <p className="text-8xl text-center my-auto">?</p>
          </div>
          <BotaoLer />
        </div>
        <div className="h-full flex flex-col justify-center mx-5 max-w-3xl items-center w-auto sm:w-3/5">
          <TextoSimples>
            <p className="p-3 text-justify m-3 text-sm sm:text-base">
              Olá caro leitor(a), acho que antes de entrarmos nessa aventura devo exclarecer algumas coisas.
              <br />
              <br />
              Caso você queria ir direto para o livro, clique em “Ler” que você poderá começar sua leitura. Aos que ficaram, olá, sou Lucas Sancho, o autor dessa história. Quero agradece-lo pelo seu tempo, espero que goste de tudo que você irá passar,
              tanto das partes boas, quanto das ruins, mas quero deixar bem claro que essa história é a minha forma de maior sinceridade, das coisas que eu um dia senti, fiz, pensei ou sofri.
              <br />
              <br />
              Antes de você começar a ler meu pequeno livro, tenho uma pergunta para fazer. Quem está certo?
            </p>
          </TextoSimples>
          <TextoSimples>
            <p className="p-3 text-justify m-3 text-sm sm:text-base">
              Femburiu po ufrupovor u cevo der bor popivupe bulbe bosde u zilhu imburiu.
              <br />
              <br />
              Uvropibe cho bolhu fembupe, ugilun, cevo quofeu ubo uchi o ju mute metro e soa @@@@@, ea sonher, e leme @@@@@. Uferu cove o suim as zestre pe leme alicorme cho olrichovo uilpu suim omu frulpo vesulipupo. Dome cho lue oquedunho ime duru um
              eabrum domeus, vupu as poco bor u mau dredriu jerlupu duru udrolpor u gulur o nor omo surucinheme vepife.
              <br />
              <br />
              Velbilao enhulpe le mibo o lus zilhum eabrum solmufolm, omdore bo mardriolpor os as tes molbipe.
            </p>
          </TextoSimples>
        </div>
      </div>
    </main>
  );
}
