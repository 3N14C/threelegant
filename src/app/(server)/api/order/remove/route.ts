import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get("orderId");

  const order = await prisma.order.delete({
    where: {
      id: orderId as string,
    },
  });

  return NextResponse.json({
    order,
    message: "Order successfull deleted",
  });
};
