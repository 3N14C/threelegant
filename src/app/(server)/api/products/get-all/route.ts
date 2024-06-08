import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const products = await prisma.product.findMany({});

  return NextResponse.json(products);
};
