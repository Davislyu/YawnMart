export interface APIResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
}
export type Image = {
  url: string;
  localPath: string;
  _id: string;
};
export type User = {
  __v: number;
  _id: string;
  avatar: Image;
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: "USER" | "ADMIN";
  updatedAt: string;
  username: string;
};

export type Category = {
  __v: number;
  _id: string;
  createdAt: string;
  name: string;
  owner: string;
  updatedAt: string;
};

type paginationContent = {
  hasNextPage: true;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  serialNumberStartFrom: number;
  totalPages: number;
};

export type Categories = paginationContent & {
  totalCategories: number;
  categories: Category[];
};

export type Product = {
  __v: number;
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  mainImage: Image;
  name: string;
  owner: string;
  price: number;
  stock: number;
  subImages: Image[];
  updatedAt: string;
};

export type Products = paginationContent & {
  totalProducts: number;
  products: Product[];
};

export type Error = {
  errors?: Record<string, string[]>;
  statusCode: number;
  message: string;
  success: boolean;
};
