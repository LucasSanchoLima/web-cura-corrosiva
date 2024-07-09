import { BotaoLer } from "@/components/botoes/Botoes";
import { FontMaquina, MirageFinal, RomanAntique } from "@/fonts/fonts";

export default function Home() {
  return (
    <main className={`h-screen w-full ${FontMaquina.className}`}>
      <div className="w-full justify-center flex flex-col lg:flex-row my-10">
        <div className="text-xl flex justify-center items-center flex-col w-full lg:w-2/5 mb-20 lg:my-auto">
          <div className="w-56 bg-zinc-700 h-80 m-4 flex justify-center">
            <p className="text-8xl text-center my-auto">?</p>
          </div>
          <BotaoLer />
        </div>
        <div className="h-full flex flex-col justify-center max-w-3xl items-center w-auto mx-5 md:mx-auto lg:mx-5 lg:w-3/5">
          <div className="bg-zinc-800 rounded m-3 lg:py-4">
            <p className={`p-2 lg:p-3 text-justify m-3 text-xl ${RomanAntique.className}`}>
              Olá caro leitor(a), acho que antes de entrarmos nessa aventura devo exclarecer algumas coisas.
              <br />
              <br />
              Caso você queira ir direto para o livro, clique em “Ler” que você poderá começar sua leitura. Aos que ficaram, olá, sou Lucas Sancho, o autor dessa história. Quero agradecê-lo pelo seu tempo, espero que goste de tudo que você irá passar,
              tanto das partes boas, quanto das ruins, mas quero deixar bem claro que essa história é a minha forma de maior sinceridade, das coisas que um dia senti, fiz, pensei ou sofri.
              <br />
              <br />
              Antes de você começar a ler meu pequeno livro, tenho uma pergunta para fazer. Quem está certo?
            </p>
          </div>
          <div className="bg-zinc-800 rounded  m-3 lg:py-4">
            <p className={`p-2 lg:p-3 text-justify m-3 text-lg ${MirageFinal.className}`}>
              Femburiu po ufrupovor u cevo der bor popivupe bulbe bosde u zilhu imburiu.
              <br />
              <br />
              Uvropibe cho bolhu fembupe, ugilun, cevo quofeu ubo uchi o ju mute metro e soa nilfau, ea sonher, e leme nilfau. Uferu cove o suim as zestre pe leme alicorme cho olrichovo uilpu suim omu frulpo vesulipupo. Dome cho lue oquedunho ime duru um
              eabrum domeus, vupu as poco bor u mau dredriu jerlupu duru udrolpor u gulur o nor omo surucinheme vepife.
              <br />
              <br />
              Velbilao enhulpe le mibo o lus zilhum eabrum solmufolm, omdore bo mardriolpor os as tes molbipe.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 h-16 flex justify-center">
        <p className="my-auto text-2xl">Projetos</p>
      </div>
      <div className="flex px-5 justify-center w-full flex-col lg:flex-row">
        <div className=" max-w-md my-10 mx-auto lg:my-auto lg:mx-24 lg:w-1/2">
          <div className="bg-zinc-800 rounded  my-3 py-4">
            <p className="text-lg text-center">Tudo por Você</p>
            <p className="text-justify p-5">
              Nesse site você já deve ter visto o primeiro arco, que é formado pelos capítulos 1, 2 e 3. Cada um dos 6 arcos que formam o livro já foram planejados, mas ainda é necessário a sua escrita e revisão. Espero que você possa me acompanhar nessa
              jornada e goste de tudo que ainda vai vir pela frente.
            </p>
            <BotaoLer />
          </div>
        </div>
        <div className="flex flex-col max-w-md mb-10 mx-auto lg:mx-20 lg:my-10 lg:w-1/2">
          <div className="bg-zinc-800 rounded  my-3 py-4">
            <p className="text-center">Livro 2</p>
            <p className="text-justify p-5 pb-0">
              O próximo livro contará a história desde o inicio da infecção até o começo do primeiro livro. O conceito já foi pensado e planejado, mas ainda é necessário formular os arcos para depois começar o processo de escrita.
            </p>
          </div>
          <div className="bg-zinc-800 rounded  my-3 py-4">
            <p className="text-center">Livro 3</p>
            <p className=" text-justify p-5 pb-0">
              O terceiro livro será a continuação direta do Tudo por Você. O conceito dele já está em planejamento e estou muito animado para poder começar a escrevê-lo. Isso só irá começar depois de terminar Tudo por Você e com a conclusão do segundo
              livro, mas garanto que logo logo chegaremos aqui.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 h-16 flex justify-center">
        <p className="my-auto text-2xl">Processo Criativo</p>
      </div>
      <div className="max-w-5xl p-4 lg:p-5 lg:my-10 mx-auto ">
        <div className="bg-zinc-800 rounded  my-3 lg:py-4">
          <p className="p-2 text-justify m-2">
            Antes de começar a escrever o livro, escolho a intenção dele. Por exemplo: “Tudo por você” é a frase que melhor expressa a emoção que estou querendo transmitir e é através disso que começo a formar a história. Depois de escolher a sensação
            começo a dividir o livro em várias partes, ou no caso, arcos. Eles precisam ser estruturados o suficiente para criar uma boa base em que irei escrever, mas flexível o suficiente para eu poder fazer bom uso de novas ideias, que surgem ao longo
            do caminho.
            <br />
            <br />
            Após a definição dos arcos começo a escrita em sí. A quantidade de capítulos e partes são feitas ao longo da escrita. Depois dela, que é a parte mais demorada, passo para a revisão, em que é feito para verificar e mudar as palavras utilizadas
            no livro, sendo a segunda parte que mais consome tempo. Basicamente a história continua a mesma, mas as palavras são trocadas para fazer com que a história seja mais fluida e crie uma melhor experiência para o leitor. Para finalizar, o livro
            passa por leitores betas para verificar a clareza da história.
          </p>
        </div>
      </div>
      <div className={`flex flex-col ${MirageFinal.className}`}>
        <div className="bg-zinc-900 flex justify-center p-4">
          <p className="my-auto text-2xl text-center">Dlulem pimbulbom</p>
        </div>
        <div className="max-w-4xl p-4 lg:p-5 mx-auto ">
          <div className="bg-zinc-800 rounded  my-3 lg:py-4">
            <p className="p-2 text-justify mx-3 text-lg">
              Omom mue drejobem cho lue bolhe asu pubu, ea chunchor bide po drocimue duru vriumue o nulmusolbe. Depos olvurur omom drejobem vese veimum cho oa femburiu po gumor, sum lue bolhe em soiem duru drepami-nem.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-12 mx-5 lg:mx-20 text-justify">
          <div className=" lg:w-1/3 bg-zinc-800 rounded  my-3 py-3 lg:py-4">
            <p className="text-center mb-2 text-xl">Morio</p>
            <p className="mx-3 text-lg ">
              Uqueuriu ilvricon depor cor u zilhu imberiu muir pe dudon, sum udolum uvoiburiu ime mo bicomos romdoibe u etru erifilun. U gersu cho unfe o velbupe sapu saibe u imberiu, olbue olbolpe cho moru lovomurie sepigivumeom, sum omdore cho u
              omvolviu moju usdligivupu, luo unborupu.
            </p>
          </div>
          <div className="lg:w-1/3 bg-zinc-800 rounded  my-3 py-3 lg:py-4">
            <p className="text-center mb-2 text-xl">Jefe</p>
            <p className="mx-4 text-lg ">Ju gei dlulojupe asu imberiu cho mo dumu lomo alicorie. Onu o ilpodolpolbo pe nicre, olbuo chunchor domeu depo jefu-ne. U chombue o cho vrioi dolmulpe mor as jefe varbe, deros ves curiem giluim.</p>
          </div>
          <div className="lg:w-1/3 bg-zinc-800 rounded  my-3 py-3 lg:py-4">
            <p className="text-center mb-2 text-xl">RDF</p>
            <p className="mx-4 text-lg ">
              Lue u lupu dlulojupe duru omo drejobe, udolum bolhe asu celbupo po gumor as mimbosu dredrie, jalbusolbo ves ipoium po asu vusdulhu oquevlamicu duru em jefuperom po rdf, duru cho onom demus bor u mau dredriu ucolbaru lomo ilvricon alicorme.
            </p>
          </div>
        </div>
        <div className="max-w-4xl p-5 mx-auto ">
          <div className="bg-zinc-800 rounded  my-3 lg:py-4">
            <p className="p-2 text-justify mx-3 text-lg">
              O mosdro tes ronoltrur cho lue mea asu osdromu, udolum as uaber, olbue me deme so pomdelitinimur os as alive drejobe der com. O cuno noltrur cho mosdro moru drierimupe u gilunimumue pe drejobe cho ombu os ulpusolbe.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
