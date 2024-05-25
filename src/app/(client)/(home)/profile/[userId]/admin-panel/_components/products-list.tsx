"use client";

import { getAllProducts } from "@/actions/product/get-all";
import { removeProductById } from "@/actions/product/remove-by-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

export const ProductsList: FC = () => {
  const pathname = usePathname();

  const { data: products, refetch } = useQuery({
    queryKey: ["products-list"],
    queryFn: getAllProducts,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeProductById,
    onSuccess: () => {
      toast.success("Товар удален");
      refetch()
    },
  });

  const handleRemoveProduct = async (productId: string) => {
    await mutateAsync({ productId });
  };

  return (
    <div className="">
      <p className="font-semibold text-xl">Товары</p>

      <Dialog>
        <DialogTrigger className="mt-2">
          <div className="flex flex-col items-start border border-primary rounded-lg max-w-fit p-4">
            {products
              ?.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage src={product.img} />
                    <AvatarFallback className="bg-zinc-300">
                      {product.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <p className="font-semibold text-lg">{product.name}</p>
                </div>
              ))
              .slice(0, 4)}
          </div>
        </DialogTrigger>

        <DialogContent className="lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Все товары</DialogTitle>
          </DialogHeader>

          <ScrollArea
            className={cn("w-full", {
              "h-[500px]": products && products.length > 4,
            })}
          >
            <div className="flex flex-col gap-4 w-full">
              {products?.map((product) => (
                <div className="grid lg:grid-cols-2 w-full">
                  <Link
                    href={`/product/${product.id}?productPage=info`}
                    key={product.id}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="w-[100px] h-[100px]"
                    />

                    <div className="">
                      <p className="font-medium text-lg leading-[178%] -tracking-[0.02rem] text-[--neutral-07] capitalize">
                        {product.name}
                      </p>

                      <p className="text-[--neutral-04]">
                        {product.measurements}
                      </p>

                      <p className="font-medium text-lg leading-[178%] -tracking-[0.02rem] text-[--neutral-07]">
                        {product.price.toLocaleString("ru-RU", {
                          style: "currency",
                          currency: "RUB",
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-2 text-center">
                    <Link
                      href={`${pathname}/product/update-product/${product.id}`}
                      className="border border-input bg-[--neutral-03] hover:bg-accent hover:text-accent-foreground rounded-lg px-3 py-2"
                    >
                      Редактировать
                    </Link>

                    <Button
                      disabled={isPending}
                      variant={"destructive"}
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Удалить"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Link
              href={`${pathname}/product/add-product`}
              className="border border-input bg-[--neutral-03] hover:bg-accent hover:text-accent-foreground rounded-lg px-3 py-2"
            >
              Добавить
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
