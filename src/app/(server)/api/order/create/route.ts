import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
  zipCode: string;
  card: string;
  date: string;
  cvc: string;
  code: string;
  totalSum: number;
  productId: string[];
  userId: string;
}

export const POST = async (req: NextRequest) => {
  const {
    firstName,
    lastName,
    email,
    city,
    street,
    zipCode,
    card,
    date,
    cvc,
    code,
    totalSum,
    productId,
    userId,
  }: IOrder = await req.json();

  const order = await prisma.order.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      city: city,
      street: street,
      zipCode: zipCode,
      card: card,
      date: date,
      cvc: cvc,
      code: code,
      totalSum: totalSum,
      products: {
        connect: productId.map((id) => ({
          id,
        })),
      },
      userId: userId,
    },
  });

  return NextResponse.json(order);
};
