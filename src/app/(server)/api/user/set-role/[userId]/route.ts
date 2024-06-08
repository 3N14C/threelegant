import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { UserRole } from "@prisma/client";

interface IParams {
  params: {
    userId: string;
  };
}

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest, ctx: any) => {
  const { params }: IParams = ctx;
  const { role } = await req.json();

  const user = await prisma.user.update({
    where: {
      id: params.userId as string,
    },

    data: {
      role: role,
    },
  });

  return NextResponse.json({
    user,
    message: "Role updated successfully",
  });
};
