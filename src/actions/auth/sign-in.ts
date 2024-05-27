"use server";

import { formSignInSchema } from "@/zod-schema/form-sign-in-schema";
import { z } from "zod";
import prisma from "@/lib/prisma-client";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (
  data: z.infer<typeof formSignInSchema> & { callbackUrl: string }
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
  });

  if (!existingUser) {
    return {
      error: "Неверная почта или пароль",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect(data.callbackUrl ?? "/");
};
