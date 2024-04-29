import prisma from "@/prisma-client";
import { FC } from "react";
import { ArticlesCard } from "./ui/articles-card";
import { LinkUnderline } from "./ui/link-underline";
import { blogParams } from "@/constants/blog-params";

const getArticles = async () => {
  const articles = await prisma.blog.findMany({
    take: 3,
  });

  return articles;
};

export const ArticlesView: FC = async () => {
  const articles = await getArticles();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="font-[500] text-[40px] leading-[110%] -tracking-[0.01]">
          Articles
        </p>

        <LinkUnderline title="More Articles" href={`/blog?${blogParams}`} />
      </div>

      <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 items-center justify-between mt-[40px]">
        {articles?.map((article) => (
          <ArticlesCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
