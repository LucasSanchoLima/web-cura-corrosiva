"use client";

import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AutenticadoProps {
  children: ReactNode;
}

export default function Autenticado({ children }: AutenticadoProps) {
  const { user, loading } = useUserContext();
  useEffect(() => {
    if (!user && !loading) {
      redirect("/login");
    }
  }, [loading]);
  return <>{children}</>;
}
