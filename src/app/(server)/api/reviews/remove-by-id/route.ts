import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const reviewId = searchParams.get("reviewId");

  const review = await prisma.review.delete({
    where: {
      id: reviewId as string,
    },
  });

  return NextResponse.json({
    review,
    message: "Review successfull deleted",
  });
};
