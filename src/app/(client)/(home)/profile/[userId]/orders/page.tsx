import { NextPage } from "next";
import { OrderTable } from "./_components/order-table";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="">
        <p className="font-semibold text-xl">История заказов</p>
      </div>

      <div className="mt-10">
        <OrderTable />
      </div>
    </div>
  );
};

export default Page;
