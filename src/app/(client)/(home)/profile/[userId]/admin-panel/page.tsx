import { NextPage } from "next";
import { UsersList } from "./_components/users-list";
import { ProductsList } from "./_components/products-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex items-start gap-20">
      <UsersList />

      <ProductsList />
    </div>
  );
};

export default Page;
