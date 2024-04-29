import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { articles } from "@/lib/articles";
import { NextPage } from "next";
import { BlogPage } from "./_components/blog-page";
import { Suspense } from "react";

interface Props {
  params: {
    blogId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="lg:w-[1440px] lg:mx-auto">
      <div className="mt-[50px]">
        <Suspense fallback={<>Loading...</>}>
          <BlogPage id={params.blogId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
