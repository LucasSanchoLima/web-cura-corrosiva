"use client";
import { MirageFinal, Alice, Radio } from "@/fonts/fonts";

interface LeitorProps {
  texto: string;
}

// <p>radio}</p>
// <p>alice}</p>

export default function Leitor({ texto }: LeitorProps) {
  texto = texto.replaceAll(/<p>\\capa(.*)<\/p>/g, `<div class="h-screen flex flex-col justify-center text-5xl text-center" >$1</div>`);
  texto = texto.replaceAll(/<p>\\menor(.*)<\/p>/g, `<div class="text-3xl text-center" >$1</div>`);
  texto = texto.replaceAll(/<p>\\titulo(.*)<\/p>/g, `<div class="text-4xl text-center my-20" >$1</div>`);
  texto = texto.replaceAll(/<p>\\subtitulo(.*)<\/p>/g, `<div class="text-3xl text-center my-10" >$1</div>`);
  
  texto = texto.replaceAll(/{\\tagarela(.+)}/g, `<span class="${MirageFinal.className}" >$1</span>`);
  texto = texto.replaceAll(/{\\radio(.+)}/g, `<span class="${Radio.className} text-xl" >$1</span>`);
  texto = texto.replaceAll("<p>{\\alice <\/p>", `<div class="${Alice.className}" >`)
  texto = texto.replaceAll("<p>alice}<\/p>", "</div>")
  texto = texto.replaceAll("<p>{\\radio <\/p>", `<div class="${Radio.className} text-xl" >`)
  texto = texto.replaceAll("<p>radio}<\/p>", "</div>")



  return <div dangerouslySetInnerHTML={{ __html: texto }}></div>;
}
