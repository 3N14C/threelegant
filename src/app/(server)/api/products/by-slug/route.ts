import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const input = {
    categoryId: searchParams.get("categoryId"),
    sortBy: searchParams.get("sortBy") as "asc" | "desc",
    take: Number(searchParams.get("take")) || 9,
    price: Number(searchParams.get("price")) || 0,
  };

  if (input.categoryId === "all-rooms") {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: input.price,
        },
      },

      orderBy: {
        createdAt: input.sortBy || "asc",
      },

      take: input.take,
    });

    return NextResponse.json(products);
  } else {
    const products = await prisma.product.findMany({
      where: {
        categoryId: input.categoryId as string,
        price: {
          gte: input.price,
        },
      },

      orderBy: {
        createdAt: input.sortBy || "asc",
      },

      take: input.take,
    });

    return NextResponse.json(products);
  }
};
