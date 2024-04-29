export interface IArticle {
  id: string;
  title: string;
  img: string;
}

export const articles: IArticle[] = [
  {
    id: "article-1",
    title: "7 ways to decor your home",
    img: "/articles/article-1.jpg",
  },

  {
    id: "article-2",
    title: "Kitchen organization",
    img: "/articles/article-2.jpg",
  },

  {
    id: "article-3",
    title: "Decor your bedroom",
    img: "/articles/article-3.jpg",
  },
];
