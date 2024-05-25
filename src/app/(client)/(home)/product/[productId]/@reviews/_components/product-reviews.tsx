"use client";

import { getProductById } from "@/actions/product/get-by-id";
import { RatingStars } from "@/components/ui/rating-stars";
import { Title } from "@/components/ui/title";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useEffect } from "react";
import { FormReview } from "./form-review";
import { LoadingMoreButton } from "@/app/(client)/(home)/_components/loading-more-button";
import { parseAsInteger, useQueryState } from "nuqs";
import { determineReview } from "@/functions/determine-review";
import { User } from "lucia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentSession } from "@/actions/user/currentSession";

interface IProps {
  id: string;
}

export const ProductReviews: FC<IProps> = ({ id }) => {
  const { data: product, refetch } = useQuery({
    queryKey: ["product-by-id"],
    queryFn: async () => {
      const response = await getProductById({ id, take });

      return response;
    },
  });

  const { data: user } = useQuery({
    queryKey: ["review-current-session"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  const [take, setTake] = useQueryState("take", parseAsInteger.withDefault(5));

  useEffect(() => {
    refetch();
  }, [take]);

  return (
    <div className="">
      <Title title="Отзывы" />

      <div className="mt-10">
        {user?.isBlocked ? (
          <p className="text-red-500">
            Вы не можете оставлять отзывы, по скольку вы заблокированы.
          </p>
        ) : (
          <FormReview id={id} />
        )}
      </div>

      <div className="mt-[50px]">
        <Title
          title={`${product?.reviews.length} ${determineReview(product?.reviews.length ?? 0)}`}
        />
        <div className="mt-[50px] flex flex-col gap-10">
          {product?.reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-5">
              {/* <Image
                src={"https://i.pravatar.cc/300"}
                width={1000}
                height={1000}
                alt="kitten"
                className="rounded-full w-20 h-20"
              /> */}
              <Avatar className="w-20 h-20">
                <AvatarImage src="/" />
                <AvatarFallback className="bg-zinc-200">
                  {review.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-5">
                <p className="text-[--neutral-07] font-semibold">
                  {review.user.username}
                </p>
                <RatingStars rating={review.rating} />
                <p className="text-[--neutral-07]">{review.comment}</p>

                <p
                  className={cn(
                    "max-w-fit border border-[--neutral-04] py-2 px-4 rounded-full text-sm cursor-pointer hover:bg-[--neutral-07] hover:text-[--neutral-01] transition duration-300"
                  )}
                >
                  Ответить
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        {product?.reviews.length && product?.reviews.length + 1 > take ? (
          <LoadingMoreButton onClick={() => setTake(take + 5)} />
        ) : null}
      </div>
    </div>
  );
};
