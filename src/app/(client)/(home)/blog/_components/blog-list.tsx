"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/trpc-client";
import { Prisma } from "@prisma/client";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useEffect } from "react";
import { ArticlesCard } from "../../_components/ui/articles-card";
import { LoadingMoreButton } from "../../_components/loading-more-button";

export type Orientation = "grid" | "fluent" | "table";

interface IProps {
  type: "public" | "featured";
}

export const BlogList: FC<IProps> = async ({ type }) => {
  const [sortBy] = useQueryState("sortBy" as Prisma.SortOrder);
  const [orientation] = useQueryState("orientation");
  const [take, setTake] = useQueryState("take", parseAsInteger);

  const {
    data: blogs,
    isLoading,
    refetch,
  } = trpc.getBlogs.useQuery({
    type,
    sortBy: sortBy! as Prisma.SortOrder,
    take: take || 9,
  });

  useEffect(() => {
    refetch();
  }, [sortBy]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="">
      <div
        className={cn("items-center", {
          "grid grid-cols-3 items-start gap-x-44 gap-y-10":
            orientation === "grid",
          "grid grid-cols-2 gap-10 justify-items-center":
            orientation === "fluent",
          // 'flex flex-col gap-10': orientation === "table",
        })}
      >
        {blogs?.map((blog) => (
          <ArticlesCard showButton={false} key={blog.id} article={blog} />
        ))}
      </div>

      {blogs && take && blogs?.length > take && (
        <div className="flex justify-center mt-20">
          <LoadingMoreButton onClick={() => setTake(take! + 9)} />
        </div>
      )}
    </div>
  );
};
