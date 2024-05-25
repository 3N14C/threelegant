import { NextPage } from "next";
import { UpdateProductPage } from "./_components/update-product-page";

interface Props {
  params: {
    productId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <UpdateProductPage productId={params.productId} />
    </div>
  );
};

export default Page;
