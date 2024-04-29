"use client";

import { FC } from "react";
import { CategoryNavbar } from "../_components/blog-navbar";
import { Filters } from "../../_components/filters";
import { BreadcrumbsImage } from "../../_components/ui/breadcrumbs-image";
import { useQueryState } from "nuqs";

interface IProps {
  all: React.ReactNode;
  featured: React.ReactNode;
}

const Layout: FC<IProps> = ({ all, featured }) => {
  const [type] = useQueryState("type");

  return (
    <div className="lg:w-[1440px] lg:mx-auto">
      <BreadcrumbsImage
        src="/blog-page.jpg"
        title="our blog"
        subtitle="Home ideas and design inspiration"
        links={[{ title: "blog" }]}
      />

      <div className="flex items-center justify-between mt-[30px]">
        <CategoryNavbar />

        <Filters />
      </div>

      <div className="mt-10">{type === "public" ? all : featured}</div>
    </div>
  );
};

export default Layout;
