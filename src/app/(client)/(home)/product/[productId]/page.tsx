import { NextPage } from "next";
import { ProductPage } from "./_components/product-page";
import { Suspense } from "react";

interface Props {
  params: {
    productId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <div className="mt-[50px]">
        <Suspense fallback={<>Loading...</>}>
          <ProductPage id={params.productId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
