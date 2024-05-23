import { NextPage } from "next";
import { OrderTable } from "./_components/order-table";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <p className="font-semibold text-xl">История заказов</p>

      <div className="mt-10">
        <OrderTable />
      </div>
    </div>
  );
};

export default Page;
