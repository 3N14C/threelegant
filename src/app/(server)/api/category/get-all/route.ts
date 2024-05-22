import prisma from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const categories = await prisma.category.findMany({});

  return NextResponse.json(categories);
};
