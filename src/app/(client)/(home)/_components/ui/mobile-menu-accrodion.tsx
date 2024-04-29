"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "next-view-transitions";
import { FC, useState } from "react";

const categoryLinks = [
  {
    id: "living-room",
    name: "Living Room",
  },

  {
    id: "bedroom",
    name: "Bedroom",
  },

  {
    id: "kitchen",
    name: "Kitchen",
  },
];

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenuAccordion: FC<IProps> = ({ open, setOpen }) => {
  return (
    <div className="text-[--neutral-07] text-sm font-medium leading-[171%]">
      <Link onClick={() => setOpen(false)} href={"/"} className="">
        Home
      </Link>

      <Accordion type="multiple" className="-space-y-[16px]">
        <AccordionItem value="shop">
          <AccordionTrigger>Shop</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-5 ml-5">
              {categoryLinks.map((category) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={category.id}
                  href={`/shop?categoryId=${category.id}`}
                  className="capitalize"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product">
          <AccordionTrigger>Product</AccordionTrigger>
          <AccordionContent>Product content</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Link href={"/contact-us"} className="capitalize">
        contact us
      </Link>
    </div>
  );
};
