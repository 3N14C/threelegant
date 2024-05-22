import { NextPage } from "next";
import { ProductsTable } from "./_components/products-table";
import { CartSummary } from "./_components/cart-summary";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="mt-10">
      <div className="flex lg:flex-row flex-col items-start gap-5">
        <div className="w-full">
          <ProductsTable />
        </div>

        <div className="lg:w-1/2 w-full">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Page;
