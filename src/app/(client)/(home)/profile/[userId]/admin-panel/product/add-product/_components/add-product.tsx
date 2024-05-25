"use client";

import { getAllCategories } from "@/actions/categories/get-all-categories";
import { createProduct } from "@/actions/product/create-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UploadButton, cn } from "@/lib/utils";
import { IProductFields } from "@/types/product-fields-interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddProduct: FC = () => {
  const [progress, setProgress] = useState<number>(0);

  const [image, setImage] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["get-all-categories"],
    queryFn: getAllCategories,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProductFields>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Товар успешно добавлен");
      reset()
    },
  });

  const handleOnSubmit = async (data: IProductFields) => {
    if (!image) return toast.error("Добавьте изображение");
    if (!categoryId) return toast.error("Выберите категорию");

    await mutateAsync({
      ...data,
      img: image,
      categoryId: categoryId,
      price: +data.price,
    });
  };

  return (
    <div className="">
      <div className="flex lg:flex-row flex-col items-center lg:items-start gap-5">
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-3">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                setImage(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
              className="w-[200px] h-[400px] bg-zinc-300 text-black"
              onUploadProgress={(progress) => setProgress(progress)}
              content={{
                button: "Добавить",
                allowedContent: "изображение",
              }}
            />

            <Progress value={progress} className="bg-zinc-200" />
          </div>

          {image && <ArrowRight className="animate-bounce" />}

          {image ? (
            <Image
              src={image || ""}
              alt={""}
              width={1000}
              height={1000}
              className="w-[200px] h-[400px]"
            />
          ) : null}
        </div>

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

        <div className="grid grid-cols-3 gap-5">
          {categories?.map((category) => (
            <div
              onClick={() => setCategoryId(category.id)}
              key={category.id}
              className={cn(
                "border border-zinc-200 px-3 py-2 rounded-lg cursor-pointer text-center transition duration-300",
                {
                  "border-primary bg-primary text-white":
                    categoryId === category.id,
                  "hover:bg-zinc-200": categoryId !== category.id,
                }
              )}
            >
              <p className="">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
