import { ReactNode } from "react";

interface textoProps {
  children: ReactNode;
}

export default function TextoSimples({ children }: textoProps) {
  return <div className="bg-zinc-800 rounded drop-shadow-md my-3 py-4">{children}</div>;
}
