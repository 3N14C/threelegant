import { Star } from "lucide-react";
import { FC } from "react";

export const RatingStars: FC = () => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} size={15} className="fill-[--neutral-07]" />
      ))}
    </div>
  );
};
