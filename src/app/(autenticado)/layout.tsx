"use client";

import { usePopUpContext } from "@/contexts/popUpContext";
import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AutenticadoProps {
  children: ReactNode;
}

export default function Autenticado({ children }: AutenticadoProps) {
  const { mudaEstadoPopUp } = usePopUpContext();
  const { user, loading } = useUserContext();
  useEffect(() => {
    if (!user && !loading) {
      mudaEstadoPopUp(1);
      redirect("/");
    }
  }, [loading, user]);
  return <>{children}</>;
}
