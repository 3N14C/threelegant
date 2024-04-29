import prisma from "@/prisma-client";
import { z } from "zod";
import { publicProcedure, router } from "./trpc-router";

export const appRouter = router({
  getBlogs: publicProcedure
    .input(
      z.object({
        type: z.enum(["public", "featured"]),
        sortBy: z.enum(["asc", "desc"]),
        take: z.number().default(9),
      })
    )
    .query(async ({ input, ctx }) => {
      const blogs = await prisma.blog.findMany({
        where: {
          type: input.type,
        },

        orderBy: {
          createdAt: input.sortBy,
        },

        take: input.take,
      });

      return blogs;
    }),

  getAllBlogs: publicProcedure.query(async ({ ctx }) => {
    const blogs = await prisma.blog.findMany({});

    return blogs;
  }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await prisma.category.findMany({});

    return categories;
  }),

  getProductsBySlug: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
        sortBy: z.enum(["asc", "desc"]),
        price: z.number(),
        take: z.number().default(9),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.categoryId !== "all-rooms") {
        const products = await prisma.product.findMany({
          where: {
            categoryId: input.categoryId,
          },

          orderBy: {
            createdAt: input.sortBy,
          },

          take: input.take,

          include: {
            offer: true,
          },
        });

        return products;
      } else {
        const products = await prisma.product.findMany({
          where: {
            price: {
              gte: input.price,
            },
          },

          orderBy: {
            createdAt: input.sortBy,
          },

          take: input.take,

          include: {
            offer: true,
          },
        });

        return products;
      }
    }),

    getProducts: publicProcedure.query(async ({ ctx }) => {
      const products = await prisma.product.findMany({});

      return products;
    })
});

export type AppRouter = typeof appRouter;
