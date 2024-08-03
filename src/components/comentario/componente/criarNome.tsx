import { requesteMudarNome } from "@/components/funcoes/funcoes";
import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import { useState } from "react";

export function CriarNome() {
  const { user, atualizarInfo } = useUserContext();
  const [erro, setErro] = useState("");

  async function criarNome(formData: FormData) {
    const resultado = await requesteMudarNome(await user!.getIdToken(), String(formData.get("nome")));

    if (resultado.resultado == "erro") {
      setErro(resultado.erro);
      return;
    }

    atualizarInfo();
  }

  return (
    <div className="w-100 rounded-md bg-zinc-900 flex flex-col items-center justify-center p-3 my-10 text-center text-base sm:text-lg ">
      <p className="p-3 text-xl sm:text-2xl ">Antes de comentar você precisa de um nome!</p>
      <form
        action={criarNome}
        className={`flex flex-col w-full sm:w-1/2 md:w-1/3 ${FontMaquina.className}`}
      >
        <p className="mb-1 ml-2 text-left">Nome:</p>
        <input
          type="text"
          name="nome"
          className="rounded-full bg-white p-1 pl-3 text-zinc-900"
        />
        {erro != "" ? <p className="p-2 mt-3 rounded-md text-base  text-red-800 border-red-950 border-2">{erro}</p> : <></>}
        <input
          type="submit"
          className="mt-3 bg-sky-800 rounded-full py-1 px-5 mx-auto  cursor-pointer"
        />
      </form>
    </div>
  );
}
