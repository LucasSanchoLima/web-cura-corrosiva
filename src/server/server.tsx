"use server";

import prisma from "@/utils/prisma";

export async function inscreverNewsletter(formData: FormData) {
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const email = String(validateEmail(formData.get("email") as string)).split(",")[0];

  if (!email) {
    return;
  }

  const existe = await prisma.newsletter.findUnique({ where: { email } });
  if (!existe) {
    const result = await prisma.newsletter.create({ data: { email } });
    console.log(result);
  }
}
