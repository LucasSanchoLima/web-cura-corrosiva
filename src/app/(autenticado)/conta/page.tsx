"use client";

import { useUserContext } from "@/contexts/userContext";

export default function Conta() {
  const { loading, user } = useUserContext();

  async function enviar() {
    const token = await user!.getIdToken();
    const request = { headers: { Authorization: token }, method: "POST" };
    const result = await fetch("/api/cadastro", request);
    console.log(await result.json());
  }

  return (
    <>
      {loading ? (
        <div>carregando</div>
      ) : (
        <div>
          <button onClick={enviar}>Teste</button>
        </div>
      )}
    </>
  );
}
