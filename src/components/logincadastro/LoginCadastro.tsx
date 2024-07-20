"use client";
import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import googleIcon from "./googleIcon.svg";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { usePopUpContext } from "@/contexts/popUpContext";

interface FormProps {
  email: string;
  password: string;
  passwordCheck: string;
}

export default function LoginCadastro() {
  const { signInWithGoogle, registerUser, esqueciSenha, loginUser, user } = useUserContext();
  const { handleSubmit, register } = useForm();
  const { qualPopUp, titulo, textoBaixo, textoBotao, mudaEstadoPopUp } = usePopUpContext();

  function google() {
    signInWithGoogle()
      .then(() => {
        mudaEstadoPopUp(0);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function login(data: any) {
    const { email, password } = data as FormProps;
    loginUser(email, password)
      .then(() => {
        mudaEstadoPopUp(0);
      })
      .catch((error) => {
        console.error(error);
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

  function esqueci(data: any) {
    const { email } = data as FormProps;
    esqueciSenha(email);
  }

  return (
    <div className="bg-zinc-900 w-11/12 sm:w-auto rounded-3xl relative flex justify-center  items-center flex-col">
      <button
        className="w-10 h-10 absolute top-2 right-2 text-center text-lg"
        onClick={() => {
          mudaEstadoPopUp(0);
        }}
      >
        X
      </button>
      <p className={`text-4xl text-center my-7 ${FontMaquina.className}`}>{titulo}</p>
      {/* Login com Google */}
      {qualPopUp != 3 ? (
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
      ) : (
        <></>
      )}
      {/* Login Inicio */}
      {qualPopUp == 1 ? (
        <form
          onSubmit={handleSubmit(login)}
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

          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                mudaEstadoPopUp(3);
              }}
              className="text-xs mt-1 sm:mt-2 mr-3"
            >
              Esqueci Minha Senha
            </button>
          </div>

          <button
            type="submit"
            className={`mx-auto my-5 px-5 sm:py-1 cursor-pointer sm:px-5 rounded-full text-xl sm:text-2xl ${FontMaquina.className} bg-sky-800`}
          >
            <p>{textoBotao}</p>
          </button>
        </form>
      ) : // Login Final
      qualPopUp == 2 ? (
        // Cadastro Inicio
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
      ) : (
        // Cadastro Final
        // Esqueci Minha Senha Inicio
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
        // Esqueci Minha Senha Final
      )}
      {qualPopUp == 1 ? (
        <button
          onClick={() => {
            mudaEstadoPopUp(2);
          }}
          className={`${FontMaquina.className} underline mb-5`}
        >
          {textoBaixo}
        </button>
      ) : qualPopUp == 2 ? (
        <button
          onClick={() => {
            mudaEstadoPopUp(1);
          }}
          className={`${FontMaquina.className} underline mb-5`}
        >
          {textoBaixo}
        </button>
      ) : (
        <button
          onClick={() => {
            mudaEstadoPopUp(1);
          }}
          className={`${FontMaquina.className} underline mb-5`}
        >
          {textoBaixo}
        </button>
      )}
    </div>
  );
}
