import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const GET = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;
  const searchParams = req.nextUrl.searchParams;
  const take = searchParams.get("take") || 5;

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },

    include: {
      category: true,
      reviews: {
        take: +take,

        include: {
          user: true,
        },
      },
    },
  });

  return NextResponse.json(product);
};
