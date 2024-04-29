import { FC } from "react";
import { ServiceCard } from "./ui/service-card";

export const ServicesView: FC = () => {
  return (
    <div className="lg:flex grid grid-cols-2 lg:gap-0 gap-[25px] justify-items-center justify-between items-center">
      <ServiceCard
        icon="Truck"
        title="Free Shipping"
        body="Order above $200"
      />

      <ServiceCard
        icon="Banknote"
        title="Money-back"
        body="30 days guarantee"
      />

      <ServiceCard
        icon="Lock"
        title="Secure Payments"
        body="Secured by Stripe"
      />

      <ServiceCard
        icon="Phone"
        title="24/7 Support"
        body="Phone and Email support"
      />
    </div>
  );
};
