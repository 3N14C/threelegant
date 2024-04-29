import { NextPage } from "next";
import { BlogList } from "../../_components/blog-list";
import { Suspense } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <BlogList type="public" />
      </Suspense>
    </div>
  );
};

export default Page;
