"use client";
import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import googleIcon from "@/../public/googleIcon.svg";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { usePopUpContext } from "@/contexts/popUpContext";

interface FormProps {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function LoginCadastro() {
  const { signInWithGoogle, registerUser } = useUserContext();
  const { handleSubmit, register } = useForm();
  const { textoBaixo, textoBotao, mudaEstadoPopUp } = usePopUpContext();

  function google() {
    signInWithGoogle()
      .then(() => {
        mudaEstadoPopUp(0);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function cadastrar(data: any) {
    const { email, password, passwordCheck } = data as FormProps;

    if (password.length < 8) {
      console.error("Senha muito curta");
      return;
    }

    if (password == passwordCheck) {
      registerUser(email, password)
        .then(() => {
          mudaEstadoPopUp(0);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Senhas diferentes");
    }
  }

  return (
    <div className=" relative flex justify-center  items-center flex-col">
      {/* Login com Google */}

      <button
        className="rounded-full w-56 h-8 sm:h-10 bg-white flex flex-row justify-center"
        onClick={google}
      >
        <Image
          className="my-auto"
          src={googleIcon}
          height={32}
          width={32}
          alt="google"
        />
        <p className="mx-4 my-auto font-semibold text-zinc-900">Entre com Google</p>
      </button>

      <form
        onSubmit={handleSubmit(cadastrar)}
        className=" my-5 mx-20 flex flex-col"
      >
        <p className="mb-1 ml-2 text-sm sm:text-base">Email</p>
        <input
          type="email"
          {...register("email", { required: true })}
          className="rounded-full sm:w-96 h-7 sm:h-10 bg-white p-3 text-zinc-900 flex flex-row justify-center"
        ></input>
        <p className="mt-3 mb-1 ml-2 text-sm sm:text-base">Senha</p>
        <input
          type="password"
          {...register("password", { required: true })}
          className="rounded-full sm:w-96 h-7 sm:h-10 bg-white p-3 text-zinc-900 flex flex-row justify-center"
        ></input>
        <p className="mt-3 mb-1 ml-2 text-sm sm:text-base">Confirmar Senha</p>
        <input
          type="password"
          {...register("passwordCheck", { required: true })}
          className="rounded-full sm:w-96 h-7 sm:h-10 bg-white p-3 text-zinc-900 flex flex-row justify-center"
        ></input>
        <input
          type="submit"
          className={`mx-auto my-5 px-5 sm:py-1 cursor-pointer sm:px-5 rounded-full text-xl sm:text-2xl ${FontMaquina.className} bg-sky-800`}
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
