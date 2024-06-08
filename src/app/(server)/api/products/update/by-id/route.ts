import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");
  const { name, description, price, categoryId } = await req.json();

  const product = await prisma.product.update({
    where: {
      id: productId as string,
    },
    data: {
      name,
      description,
      price,
      categoryId,
    },
  });

  return NextResponse.json({
    product,
    message: "Product updated successfully",
  });
};
