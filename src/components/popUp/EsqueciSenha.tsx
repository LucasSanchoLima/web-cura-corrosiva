"use client";
import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";

import { useForm } from "react-hook-form";
import { usePopUpContext } from "@/contexts/popUpContext";

interface FormProps {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function EsqueciSenha() {
  const { esqueciSenha } = useUserContext();
  const { handleSubmit, register } = useForm();
  const { textoBaixo, textoBotao, mudaEstadoPopUp } = usePopUpContext();

  function esqueci(data: any) {
    const { email } = data as FormProps;
    esqueciSenha(email);
  }

  return (
    <div className=" relative flex justify-center  items-center flex-col">
      <form
        onSubmit={handleSubmit(esqueci)}
        className=" my-5 mx-20 flex flex-col"
      >
        <p className="mb-1 ml-2 text-sm sm:text-base">Email</p>
        <input
          type="email"
          {...register("emailEsqueci", { required: true })}
          className="rounded-full sm:w-96 h-7 sm:h-10 bg-white p-3 text-zinc-900 flex flex-row justify-center"
        ></input>
        <input
          type="submit"
          className={`mx-auto my-5 px-5 sm:py-1 cursor-pointer rounded-full text-xl sm:text-2xl ${FontMaquina.className} bg-sky-800`}
          value={textoBotao}
        ></input>
      </form>

      <button
        onClick={() => {
          mudaEstadoPopUp(1);
        }}
        className={`${FontMaquina.className} underline mb-5`}
      >
        {textoBaixo}
      </button>
    </div>
  );
}
