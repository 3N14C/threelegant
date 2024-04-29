import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { blogParams } from "@/constants/blog-params";
import prisma from "@/prisma-client";
import { Calendar, UserCircle } from "lucide-react";
import Image from "next/image";
import { FC, Fragment } from "react";
import { ArticlesCard } from "../../../_components/ui/articles-card";
import { LinkUnderline } from "../../../_components/ui/link-underline";
import InnerHTML from "dangerously-set-html-content";

const getBlogById = async (id: string) => {
  return await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });
};

const getSameBlogs = async (id: string) => {
  return await prisma.blog.findMany({
    where: {
      NOT: {
        id: id,
      },
    },

    take: 3,
  });
};

interface IProps {
  id: string;
}

// font-weight: 400;
// font-size: 16px;
// line-height: 162%;
// color: var(--brand-color);

// font-family: var(--second-family);
// font-weight: 500;
// font-size: 28px;
// line-height: 121%;
// letter-spacing: -0.02em

export const BlogPage: FC<IProps> = async ({ id }) => {
  const blog = await getBlogById(id);
  const sameBlogs = await getSameBlogs(id);

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { title: "blog", href: `/blog?${blogParams}` },
          {
            title:
              blog?.title.length && blog?.title.length > 20
                ? blog?.title.slice(0, 20) + "..."
                : blog?.title,
            href: `/blog/${blog?.id}`,
          },
        ]}
      />

      <div className="mt-[55px] flex flex-col gap-[25px]">
        <p className="uppercase font-[700] text-[12px] leading-[100%]">
          article
        </p>

        <p className="font-medium text-[54px] leading-[107%] -tracking-[0.02rem] text-[--neutral-07] max-w-[900px]">
          {blog?.title}
        </p>

        <div className="flex items-center gap-[50px]">
          <div className="flex items-center gap-[4px]">
            <UserCircle color="#6c7275" size={22} />
            <p className="text-base leading-[162%] text-[--neutral-04]">
              Henric Annemark
            </p>
          </div>

          <div className="flex items-center gap-[4px]">
            <Calendar color="#6c7275" size={22} />
            <p className="text-base leading-[162%] text-[--neutral-04]">
              {new Date(blog?.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Image
            src={blog?.img[0] || ""}
            alt={blog?.title || ""}
            width={1000}
            height={1000}
            className="w-full h-[646px]"
          />

          <div className="mt-10">
            <div dangerouslySetInnerHTML={{ __html: blog?.content1 || "" }} />
          </div>

          <div className="mt-10 flex items-center justify-between">
            <Image
              src={blog?.img[1] || ""}
              alt={blog?.title || ""}
              width={1000}
              height={1000}
              className="w-[550px] h-[730px]"
            />
            <Image
              src={blog?.img[2] || ""}
              alt={blog?.title || ""}
              width={1000}
              height={1000}
              className="w-[550px] h-[730px]"
            />
          </div>

          <div className="mt-10">
            <InnerHTML html={blog?.content2 || ""} />
          </div>

          <div className="mt-10 flex items-start gap-10">
            <Image
              src={blog?.img[3] || ""}
              alt={blog?.title || ""}
              width={1000}
              height={1000}
              className="w-[550px] h-[730px]"
            />

            <div className="">
              <InnerHTML html={blog?.content3 || ""} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[160px]">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px] leading-[121%] -tracking-[0.02rem]">
            You might also like
          </p>
          <LinkUnderline title="More Articles" href={`/blog?${blogParams}`} />
        </div>

        <div className="mt-[50px] flex justify-between items-start">
          {sameBlogs?.map((blog) => (
            <ArticlesCard showButton={false} key={blog.id} article={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};
