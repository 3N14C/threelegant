import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const { isBlocked } = await req.json();
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");

  const user = await prisma.user.update({
    where: {
      id: userId as string,
    },

    data: {
      isBlocked: isBlocked,
      review: {
        deleteMany: {
          userId: userId as string,
        },
      },
    },
  });

  return NextResponse.json({
    user,
    message: "User blocked/unblocked successfully",
  });
};
