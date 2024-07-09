"use client";

import { useUserContext } from "@/contexts/userContext";
import { useForm } from "react-hook-form";

interface FormProps {
  email: string;
  password: string;
}

export default function Login() {
  const { signInWithGoogle, registerUser, logOut } = useUserContext();

  const { handleSubmit, register } = useForm();

  function submit(data: any) {
    const { email, password } = data as FormProps;
    registerUser(email, password);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input
          type="email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
      <button onClick={signInWithGoogle}>Click</button>
      <button onClick={logOut}>Sair</button>
    </div>
  );
}
