import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { UserRole } from "@prisma/client";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./lib/prisma-client";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },

  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      email: databaseUserAttributes.email,
      password: databaseUserAttributes.password,
      name: databaseUserAttributes.name,
      username: databaseUserAttributes.username,
      role: databaseUserAttributes.role,
      isBlocked: databaseUserAttributes.isBlocked,
    };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.log(error);
  }
  return result;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  role: UserRole;
  isBlocked: boolean;
}
