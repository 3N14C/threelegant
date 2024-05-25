"use client";

import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getProductsBySlug } from "@/actions/product/get-by-slug";
import { Checkbox } from "@/components/ui/checkbox";
import { priceVariants } from "@/lib/price-variants";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Settings2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC } from "react";
import { Filters } from "../_components/filters";
import { LoadingMoreButton } from "../_components/loading-more-button";
import { BreadcrumbsImage } from "../_components/ui/breadcrumbs-image";
import { DesktopLayout } from "./_components/desktop-layout";
import { MobileLayout } from "./_components/mobile-layout";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="">
      <div className="lg:block hidden">
        <DesktopLayout>{children}</DesktopLayout>
      </div>

      <div className="block lg:hidden px-4">
        <MobileLayout>{children}</MobileLayout>
      </div>
    </div>
  );
};

export default Layout;
