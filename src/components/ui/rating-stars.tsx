import { Star } from "lucide-react";
import { FC } from "react";

interface IProps {
  rating: number;
}

export const RatingStars: FC<IProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, idx) => (
        <Star key={idx} size={15} className="fill-[--neutral-07]" />
      ))}
    </div>
  );
};
