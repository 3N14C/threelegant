import { NextPage } from "next";
import { FormOrder } from "./_components/form-order";
import { OrderSummary } from "./_components/order-summary";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex lg:flex-row flex-col mt-10 gap-10">
      <div className="w-full lg:order-1 order-2">
        <FormOrder />
      </div>

      <div className="lg:w-1/2 lg:order-2 order-1">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;
