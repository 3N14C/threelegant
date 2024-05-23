"use server";

import { validateRequest } from "@/auth";

export const getCurrentSession = async () => {
  const { user } = await validateRequest();

  return { user };
};
