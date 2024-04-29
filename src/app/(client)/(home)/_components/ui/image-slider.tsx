import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { images } from "@/lib/image-slider";
import Image from "next/image";
import { FC } from "react";

export const ImageSlider: FC = () => {
  return (
    <Carousel>
      <CarouselContent className="">
        {images.map((img) => (
          <CarouselItem key={img.id}>
            <Image
              src={img.url}
              alt={img.id}
              width={1000}
              height={1000}
              className="lg:w-full lg:h-[550px] w-[310px] h-[305px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="lg:opacity-100 opacity-0">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
