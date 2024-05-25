import { NextPage } from "next";
import { AddProduct } from "./_components/add-product";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default Page;
