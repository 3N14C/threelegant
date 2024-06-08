import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");

  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },

    include: {
      products: true,
    },
  });

  return NextResponse.json(orders);
};
