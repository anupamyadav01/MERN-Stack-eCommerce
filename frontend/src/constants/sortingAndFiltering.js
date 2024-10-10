export const sortByOptions = [
  { label: "All", value: "" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Rating - High to Low", value: "rating-desc" },
  { label: "Rating - Low to High", value: "rating-asc" },
  { label: "Price - Low to High", value: "price-asc" },
  { label: "Price - High to Low", value: "price-desc" },
  { label: "Name - A to Z", value: "name-asc" },
  { label: "Name - Z to A", value: "name-desc" },
];

export const productsPriceRange = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $2000", min: 1000, max: 2000 },
  { label: "Above $2000", min: 2000, max: 10000 },
];

export const productsBrand = [
  "Apple",
  "Samsung",
  "Vivo",
  "Realme",
  "OnePlus",
  "MI",
  "Oppo",
];
export const productsType = [
  "Smartphone",
  "Tablet",
  "Laptop",
  "Smartwatch",
  "Headphones",
  "Camera",
  "Television",
  "Gaming Console",
  "Home Appliance",
];
export const discount = [
  {
    label: "50% or more",
    value: 50,
  },
  {
    label: "40% or more",
    value: 40,
  },
  {
    label: "30% or more",
    value: 30,
  },
  {
    label: "20% or more",
    value: 20,
  },
  {
    label: "10% or more",
    value: 10,
  },
];

export const customerRating = [
  {
    label: "4★ & above",
    value: 4,
  },
  {
    label: "3★ & above",
    value: 3,
  },
  {
    label: "2★ & above",
    value: 2,
  },
  {
    label: "1★ & above",
    value: 1,
  },
];
