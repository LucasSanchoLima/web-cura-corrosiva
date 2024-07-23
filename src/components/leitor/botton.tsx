"use client";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ArcoToNumero, numeroToNomeArco, numerToText } from "./variaveis";
import { FontMaquina } from "@/fonts/fonts";

export default function LeitorBotton({ arco }: {arco:string}){

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
          return "/obrigado";
        }
    
        return "/livro/" + numeroToNomeArco[resultado];
      }
      
    return (<div className="flex flex-row items-center mt-10">
        <div className="w-1/3 flex justify-start">
          <Link
            className="bg-zinc-900 p-5 rounded-xl"
            href={arcoAnterior()}
          >
            <GrPrevious />
          </Link>
        </div>
        <div className="w-1/3 flex justify-center">
          <p className={`text-center text-sm md:text-lg bg-zinc-900 indent-0 rounded p-5 text-nowrap ${FontMaquina.className}`}>{numerToText[ArcoToNumero[arco]]}</p>
        </div>
        <div className="w-1/3 flex justify-end">
          <Link
            className={`${ArcoToNumero[arco] == 8 ? "bg-sky-900" : "bg-zinc-900"}  p-5 rounded-xl`}
            href={proximoArco()}
            onClick={()=>{
                if(ArcoToNumero[arco] < 8){
                    localStorage.setItem("CapLendo", String(ArcoToNumero[arco] + 1))
                }
            }}
          >
            <GrNext />
          </Link>
        </div>
      </div>);
}