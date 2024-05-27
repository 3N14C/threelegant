import { NextPage } from "next";
import { Suspense } from "react";
import { ProductPage } from "./_components/product-page";

interface Props {
  params: {
    productId: string;
  };

  searchParams?: {
    productPage: string;
  };
}

const Page: NextPage<Props> = ({ params, searchParams }) => {
  return (
    <div>
      <div className="mt-[50px] lg:px-0 px-10">
        <Suspense fallback={<>Loading...</>}>
          <ProductPage id={params.productId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
