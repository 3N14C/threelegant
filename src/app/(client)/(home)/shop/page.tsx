import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { NextPage } from "next";
import { BreadcrumbsImage } from "../_components/ui/breadcrumbs-image";
import { ProductList } from "./_components/product-list";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="lg:w-[1440px] lg:mx-auto">
      <ProductList />
    </div>
  );
};

export default Page;
