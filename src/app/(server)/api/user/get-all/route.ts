import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const currentUserId = searchParams.get("currentUserId");

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId as string,
      },
    },
  });

  return NextResponse.json(users);
};
