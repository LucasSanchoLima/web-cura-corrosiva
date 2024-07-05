import { Noto_Serif } from "next/font/google";
import localFont from "next/font/local";
export const MirageFinal = localFont({ src: "./MirageFinal.ttf" });
export const RomanAntique = localFont({ src: "./RomanAntique.ttf" });
export const FontMaquina = Noto_Serif({ weight: ["400"], subsets: ["latin"] });
