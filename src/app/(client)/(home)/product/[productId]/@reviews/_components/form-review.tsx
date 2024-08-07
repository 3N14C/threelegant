"use client";

import { createReview } from "@/actions/review/create-review";
import { getCurrentSession } from "@/actions/user/currentSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { reviewSchema } from "@/zod-schema/review-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Reply, Star } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  id: string;
}

export const FormReview: FC<IProps> = ({ id }) => {
  const [rating, setRating] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["current-user-review"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof reviewSchema>>({
    defaultValues: {},
    resolver: zodResolver(reviewSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      reset();
      setRating(null);
      toast.success("Отзыв добавлен");

      queryClient.invalidateQueries({
        queryKey: ["product-by-id"],
      });
    },
  });

  const handleOnSubmit = async (data: z.infer<typeof reviewSchema>) => {
    await mutateAsync({
      ...data,
      rating: rating,
      productId: id,
      userId: user?.id!,
    });
  };

  const handleChooseRating = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            onClick={() => handleChooseRating(index + 1)}
            key={index + 1}
            size={25}
            className={cn("text-[--primary-01] cursor-pointer", {
              "fill-[--primary-01]": rating && index < rating,
            })}
          />
        ))}
      </div>

      <form
        className="flex items-center"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="w-full relative">
          <Input
            {...register("comment")}
            placeholder="Ваш отзыв"
            className="rounded-l-full border-[--neutral-04] h-14"
          />
          {errors.comment && (
            <p className="text-red-500 absolute">{errors.comment.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="flex items-center gap-2 h-14 rounded-r-full"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Reply size={18} />
              <p>Отправить</p>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
