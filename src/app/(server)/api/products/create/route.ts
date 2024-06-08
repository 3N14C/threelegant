import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";
import { IProductFields } from "@/types/product-fields-interface";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  const data: IProductFields = await req.json();

  const product = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      measurements: data.measurements,
      description: data.description,
      img: data.img,
      categoryId: data.categoryId,
    },
  });

  return NextResponse.json({
    product,
    message: "Product created successfully",
  });
};
