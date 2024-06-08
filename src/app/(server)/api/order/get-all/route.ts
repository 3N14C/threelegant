import prisma from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const orders = await prisma.order.findMany({
    include: {
      products: true,
    },
  });

  return NextResponse.json(orders);
};
