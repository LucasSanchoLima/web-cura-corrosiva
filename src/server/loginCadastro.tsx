"use server";

import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/auth";

export async function jaCadastrado(usuario: DecodedIdToken) {
  const result = await prisma.usuario.findUnique({ where: { email: usuario.email } });
  if (!result) {
    await prisma.usuario.create({ data: { email: usuario.email!, emailPagamento: usuario.email!, verificado: usuario.email_verified, config: {} as Prisma.JsonArray } });
  }
}
