import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import path from "path";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const file = readFileSync(path.resolve("../../pdf/LivroArco1Preto.pdf"));
//   res.setHeader("Content-Type", "application/pdf");
//   res.status(200);

//   return res.send(file);
// }

export async function GET(req: Request) {
  const file = readFileSync(path.resolve("./src/pdf/LivroArco1Preto.pdf"));
  return new Response(file, { headers: { "Content-Type": "application/pdf" } });
}
