import { NextPage } from "next";
import { ProductReviews } from "./_components/product-reviews";

interface Props {
  params: {
    productId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="mt-10">
      <ProductReviews id={params.productId} />
    </div>
  );
};

export default Page;
