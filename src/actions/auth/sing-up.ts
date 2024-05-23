"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma-client";
import { formSignUpSchema } from "@/zod-schema/form-sign-up-schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const formSignUpWithoutAgree = formSignUpSchema.omit({ agree: true });

export const signUp = async (data: z.infer<typeof formSignUpWithoutAgree>) => {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  const session = await lucia.createSession(user.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
};
