import { NextPage } from "next";
import { ImageSlider } from "./_components/ui/image-slider";
import { SimplyText } from "./_components/simply-text";
import { CategoryView } from "./_components/category-view";
import { Suspense } from "react";
import { NewArrivals } from "./_components/new-arrivals-view";
import { CategorySkeleton } from "@/components/skeletons/category-skeleton";
import { ServicesView } from "./_components/services-view";
import { SaleBanner } from "./_components/ui/sale-banner";
import { ArticlesView } from "./_components/articles-view";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <div className="lg:w-[1440px] lg:mx-auto lg:px-0 px-[40px]">
        <ImageSlider />
      </div>

      <div className="mt-[32px] lg:w-[1440px] lg:mx-auto lg:px-0 px-[40px]">
        <SimplyText />
      </div>

      <div className="mt-[50px] lg:w-[1440px] lg:mx-auto mx-10">
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryView />
        </Suspense>
      </div>

      <div className="mt-[50px] lg:w-[1440px] lg:mx-auto">
        <Suspense fallback={<>Loading...</>}>
          <NewArrivals />
        </Suspense>
      </div>

      <div className="mt-[50px] lg:w-[1440px] lg:mx-auto mx-[40px]">
        <ServicesView />
      </div>

      <div className="mt-[50px] lg:w-[1440px] lg:mx-auto">
        <SaleBanner />
      </div>

      <div className="mt-[50px] lg:w-[1440px] lg:mx-auto mx-[40px]">
        <Suspense fallback={<>Loading...</>}>
          <ArticlesView />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;