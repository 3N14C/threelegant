'use client'

import { ShoppingBag } from "lucide-react";
import { FC } from "react"

export const CartProductCounter: FC = () => {
    return (
      <div className="">
        <ShoppingBag size={22} />
      </div>
    );
}