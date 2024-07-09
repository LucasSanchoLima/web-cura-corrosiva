"use client";

import { useUserContext } from "@/contexts/userContext";

export default function Conta() {
  const { loading } = useUserContext();

  return <>{loading ? <div>carregando</div> : <div>PO</div>}</>;
}
