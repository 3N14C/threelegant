import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const GET = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;

  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId as string,
    },

    include: {
      products: true,
    },
  });

  return NextResponse.json(order);
};
