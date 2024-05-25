"use client";

import { getProductById } from "@/actions/product/get-by-id";
import { updateProductById } from "@/actions/product/patch-by-id";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  productId: string;
}

export interface IDataForm {
  name: string | undefined;
  price: number | undefined;
  measurements: string | undefined;
  description: string | undefined;
}

export const UpdateProductPage: FC<IProps> = ({ productId }) => {
  const queryClient = useQueryClient();
  const { data: product } = useQuery({
    queryKey: ["update-product-by-id"],
    queryFn: async () => await getProductById({ id: productId }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataForm>({
    values: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      measurements: product?.measurements,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProductById,
    onSuccess: () => {
      toast.success("Товар успешно обновлен");
      queryClient.invalidateQueries({ queryKey: ["update-product-by-id"] });
    },
  });

  const handleOnSubmit = async (data: IDataForm) => {
    await mutateAsync({
      ...data,
      productId,
      price: data.price && +data.price,
    });
  };

  return (
    <div className="flex lg:flex-row flex-col items-center lg:items-start gap-10">
      <Image
        src={product?.img || ""}
        alt={product?.name || ""}
        width={1000}
        height={1000}
        className="w-[200px] h-[400px]"
      />

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4"
      >
        <Input {...register("name")} placeholder="Имя товара" />
        <Input {...register("price")} placeholder="Цена товара" />
        <Input {...register("measurements")} placeholder="Размеры товара" />
        <textarea
          {...register("description")}
          cols={30}
          rows={10}
          className="border border-input bg-background px-3 py-2 text-sm focus:outline-none rounded-lg"
        ></textarea>

        <Button type="submit">
          {isPending ? <Loader2 className="animate-spin" /> : "Принять"}
        </Button>
      </form>
    </div>
  );
};
