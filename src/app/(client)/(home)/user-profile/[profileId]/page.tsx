import { NextPage } from "next";
import { Profile } from "./_components/profile";
import { OrdersProfile } from "./_components/orders-profile";

interface Props {
  params: {
    profileId: string;
  };
}

const Page: NextPage<Props> = ({ params }) => {
  return (
    <div className="lg:w-[1440px] lg:mx-auto lg:px-0 px-4 mt-20">
      <Profile profileId={params.profileId} />

      <div className="mt-10">
        <OrdersProfile profileId={params.profileId} />
      </div>
    </div>
  );
};

export default Page;
