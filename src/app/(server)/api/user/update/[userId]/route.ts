import prisma from "@/lib/prisma-client";
import { updateProfileSchema } from "@/zod-schema/form-update-profile-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
  params: {
    userId: string;
  };
}

export const PATCH = async (req: NextRequest, ctx: any) => {
  const { params }: IParams = ctx;
  const {
    name,
    username,
    email,
    newPassword,
    oldPassword,
  }: z.infer<typeof updateProfileSchema> = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (existingUser?.password !== oldPassword) {
    throw new Error("Wrong password");
  }

  const user = await prisma.user.update({
    where: {
      id: params.userId,
    },

    data: {
      name,
      username,
      email,
      password: newPassword,
    },
  });

  return NextResponse.json({
    user,
    message: "User successfully updated",
  });
};
