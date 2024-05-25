import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");

  const product = await prisma.product.delete({
    where: {
      id: productId as string,
    },
  });

  return NextResponse.json({
    product,
    message: "Product successfull deleted",
  });
};
