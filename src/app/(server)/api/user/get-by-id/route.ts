import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const profileId = searchParams.get("profileId");

  const user = await prisma.user.findUnique({
    where: {
      id: profileId as string,
    },

    include: {
      order: true,
    },
  });

  return NextResponse.json(user);
};
