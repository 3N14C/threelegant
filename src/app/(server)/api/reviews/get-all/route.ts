import prisma from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
    const reviews = await prisma.review.findMany();

    return NextResponse.json(reviews)
}