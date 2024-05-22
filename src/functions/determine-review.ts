export const determineReview = (rating: number) => {
  if (rating % 10 === 1) return "отзыв";

  if (
    rating % 10 >= 2 &&
    rating % 10 <= 4 &&
    (rating % 100 < 10 || rating % 100 >= 20)
  )
    return "отзыва";

  return "отзывов";
};
