import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username");
  const currentUserId = searchParams.get("currentUserId");

  const user = await prisma.user.findMany({
    where: {
      username: {
        contains: username as string,
      },
      NOT: {
        id: currentUserId as string,
      },
    },
  });
  return NextResponse.json(user);
};
