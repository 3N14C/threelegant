"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";

export const signOut = async () => {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Невозможно выйти из аккаунта");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
