import { NextPage } from "next";
import { BlogList, Orientation } from "../../_components/blog-list";
import { Suspense } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Suspense fallback={null}>
        <BlogList type="featured" />
      </Suspense>
    </div>
  );
};

export default Page;
