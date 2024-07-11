"use client";

import { usePopUpContext } from "@/contexts/popUpContext";
import LoginCadastro from "../logincadastro/LoginCadastro";

export default function PopUp() {
  const { qualPopUp } = usePopUpContext();

  if (!qualPopUp) {
    return <></>;
  }

  return (
    <div className="bg-black/80 fixed inset-0">
      <div className="relative w-full h-full flex justify-center items-center">
        <LoginCadastro />
      </div>
    </div>
  );
}
