// Deterministic catalogue used by the QA suite. Photos are local files so
// the suite does not depend on Cloudinary or any other third-party host.
export type MockProduct = {
  _id: string;
  name: string;
  photos: { url: string; public_id: string }[];
  price: number;
  stock: number;
  category: string;
  ratings: number;
  averageRating: number;
  numOfReviews: number;
  description: string;
};

const photo = (file: string) => [{ url: `/images/${file}`, public_id: file }];

export const products: MockProduct[] = [
  {
    _id: "p-sweatshirt",
    name: "Oatmeal Crew-Neck Sweatshirt",
    photos: photo("virtuo-editorial.jpg"),
    price: 1499,
    stock: 12,
    category: "Clothing",
    ratings: 4,
    averageRating: 4,
    numOfReviews: 3,
    description: "A soft brushed-fleece crew neck for everyday layering.",
  },
  {
    _id: "p-bag",
    name: "Burnt Orange Canvas Tote",
    photos: photo("heads.png"),
    price: 899,
    stock: 4,
    category: "Accessories",
    ratings: 5,
    averageRating: 5,
    numOfReviews: 1,
    description: "Sturdy canvas tote with leather handles.",
  },
  {
    _id: "p-sneakers",
    name: "Ivory Low-Top Sneakers",
    photos: photo("tails.png"),
    price: 2499,
    stock: 0,
    category: "Shoes",
    ratings: 3.5,
    averageRating: 3.5,
    numOfReviews: 8,
    description: "Clean leather sneakers that go with everything.",
  },
  {
    _id: "p-long",
    name: "Extraordinarily Long Product Name For Testing Wrapping, Truncation And Overflow Behaviour Across Every Card Layout Supercalifragilisticexpialidocious",
    photos: photo("heads.png"),
    price: 123456,
    stock: 3,
    category: "Clothing",
    ratings: 2,
    averageRating: 2,
    numOfReviews: 0,
    description:
      "Pathologically long description. Pneumonoultramicroscopicsilicovolcanoconiosis-level verbosity, with-hyphenated-compound-words-that-cannot-break-normally-anywhere-in-the-layout-and-should-be-wrapped-safely.",
  },
  {
    _id: "p-nophoto",
    name: "Wool Blend Beanie",
    photos: [],
    price: 399,
    stock: 20,
    category: "Accessories",
    ratings: 0,
    averageRating: 0,
    numOfReviews: 0,
    description: "Product without any photo; the card should fall back gracefully.",
  },
  {
    _id: "p-denim",
    name: "Indigo Straight Jeans",
    photos: photo("virtuo-editorial.jpg"),
    price: 2199,
    stock: 7,
    category: "Clothing",
    ratings: 4.5,
    averageRating: 4.5,
    numOfReviews: 12,
    description: "Straight-leg denim with a mid rise.",
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
