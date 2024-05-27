"use client";

import { Link } from "next-view-transitions";
import { FC, Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

interface IProps {
  links?: {
    title?: string;
    href?: string;
  }[];
}

export const Breadcrumbs: FC<IProps> = ({ links }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="">
        <BreadcrumbItem>
          <Link
            className="text-sm font-medium leading-[171%] text-[--neutral-04]"
            href="/"
          >
            Главная
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
