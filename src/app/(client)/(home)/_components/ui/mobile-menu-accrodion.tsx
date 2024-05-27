"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { shopParams } from "@/constants/shop-params";
import { Link } from "next-view-transitions";
import { FC, useState } from "react";

const categoryLinks = [
  {
    id: "living-room",
    name: "Гостиная",
  },

  {
    id: "bedroom",
    name: "Спальня",
  },

  {
    id: "kitchen",
    name: "Кухня",
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
        Главная
      </Link>

      <Accordion type="multiple" className="">
        <AccordionItem value="shop">
          <AccordionTrigger>Каталог</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-5 ml-5">
              {categoryLinks.map((category) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={category.id}
                  href={`/shop?categoryId=${category.id}&${shopParams}`}
                  className="capitalize"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
