import { Blog } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { LinkUnderline } from "./link-underline";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Link } from "next-view-transitions";

export type BlogWithCreatedAt = Omit<Blog, "createdAt"> & {
  createdAt: string;
};

interface IProps {
  article: BlogWithCreatedAt | Blog;
  showButton?: boolean;
}

export const ArticlesCard: FC<IProps> = ({ article, showButton = true }) => {
  return (
    <div className={cn("flex flex-col gap-[25px] w-fit relative", {})}>
      {!showButton ? (
        <>
          <Link href={`/blog/${article.id}`} className="">
            <Image
              src={article.img?.[0] || ""}
              alt={article?.title || ""}
              width={1000}
              height={1000}
              className={cn("transition-all duration-300 w-[360px] h-[325px]", {
                "filter blur-[6px]": article.type === "featured",
                "hover:scale-105": article.type === "public",
              })}
            />
          </Link>
        </>
      ) : (
        <Image
          src={article.img?.[0] || ""}
          alt={article?.title || ""}
          width={1000}
          height={1000}
          className={cn("w-[360px] h-[325px]", {
            "filter blur-[6px]": article.type === "featured",
          })}
        />
      )}

      <div
        className={cn(
          "opacity-0 absolute left-1/2 top-1/3 -translate-x-[40%] -translate-y-1/2 select-none flex flex-col gap-2 items-center",
          {
            "opacity-100": article.type === "featured",
          }
        )}
      >
        <Lock color="#ffffff" size={32} />

        <p className="text-[--neutral-01] font-medium text-base">
          Blog now is feature
        </p>
      </div>

      <p
        className={cn(
          "font-[500] text-[20px] leading-[140%] text-[--neutral-07] max-w-[350px]",
          {
            "filter blur-[5px] select-none": article.type === "featured",
          }
        )}
      >
        {article.title}
      </p>

      {showButton ? (
        <div
          className={cn("", {
            "filter blur-[5px] select-none": article.type === "featured",
          })}
        >
          <LinkUnderline
            title="Read More"
            href={`/blog/${article.id}`}
            type={article.type}
          />
        </div>
      ) : (
        <div className="">
          <p className="text-[12px] text-[--neutral-04] leading-[167%]">
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};
