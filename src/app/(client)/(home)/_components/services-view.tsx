import { FC } from "react";
import { ServiceCard } from "./ui/service-card";

export const ServicesView: FC = () => {
  return (
    <div className="lg:flex grid grid-cols-2 lg:gap-0 gap-[25px] justify-items-center justify-between items-center">
      <ServiceCard
        icon="Truck"
        title="Бесплтаня доставка"
        body={`При заказе от ${parseFloat("9000").toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          maximumFractionDigits: 2,
        })}`}
      />

      <ServiceCard
        icon="Banknote"
        title="Возврат средств"
        body="30 дней гарантии"
      />

      <ServiceCard
        icon="Lock"
        title="Защищенные платежи"
        body="Защищен по SSL"
      />

      <ServiceCard
        icon="Phone"
        title="24/7 Поддержка"
        body="Онлайн поддержка"
      />
    </div>
  );
};
