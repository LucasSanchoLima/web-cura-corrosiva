"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  const windowSize = useWindowSize();
  return <>{windowSize.largura! > 640 ? <HeaderDesktop /> : <HeaderMobile />}</>;
}
