import { NextPage } from "next";
import { OrderProducts } from "./_components/order-payment-products";

interface Props {
  params: {
    orderId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="mt-20">
      <div className="lg:text-center text-left flex flex-col gap-3">
        <p className="text-[--neutral-04] text-2xl font-medium">
          Спасибо вам!🎉
        </p>

        <p className="font-semibold text-3xl">Ваш заказ был успешно оплачен</p>
      </div>

      <div className="mt-10">
        <OrderProducts orderId={params.orderId} />
      </div>
    </div>
  );
};

export default Page;
