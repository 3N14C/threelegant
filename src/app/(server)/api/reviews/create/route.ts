import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const POST = async (req: NextRequest) => {
  const { comment, rating, productId } = await req.json();

  const review = await prisma.review.create({
    data: {
      comment: comment,
      rating: rating,
      products: {
        connect: {
          id: productId,
        },
      },
    },
  });

  return NextResponse.json(review);
};
