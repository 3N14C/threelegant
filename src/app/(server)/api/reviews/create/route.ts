import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const POST = async (req: NextRequest) => {
  const { comment, rating, productId, userId } = await req.json();

  const review = await prisma.review.create({
    data: {
      comment: comment,
      rating: rating,
      products: {
        connect: {
          id: productId,
        },
      },
      userId: userId,
    },
  });

  return NextResponse.json(review);
};
