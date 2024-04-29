"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { Link } from "next-view-transitions";

interface IProps {
  links?: {
    title?: string;
    href?: string;
  }[];
}

export const Breadcrumbs: FC<IProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList className="">
        <BreadcrumbItem>
          <Link
            className="text-sm font-medium leading-[171%] text-[--neutral-04]"
            href="/"
          >
            Home
          </Link>
        </BreadcrumbItem>
        {links?.map((link, idx) => (
          <Fragment key={idx}>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="capitalize">
              {idx === links.length - 1 ? (
                <BreadcrumbPage className="text-sm font-medium leading-[171%] text-[--neutral-07] select-none">
                  {link.title}
                </BreadcrumbPage>
              ) : (
                <>
                  {link.href ? (
                    <Link
                      className="text-sm font-medium leading-[171%] text-[--neutral-04]"
                      href={link?.href || "/"}
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium leading-[171%] text-[--neutral-04] select-none">
                      {link.title}
                    </p>
                  )}
                </>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
