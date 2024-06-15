import { LocalFile } from "./File";

export type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "FREE";

export type SizeAndPrice = {
  size: Sizes | "";
  price: number;
  actualPrice: number;
  remainingQuantity?: number;
  discount?: number;
};

export type ProductPayload = {
  files: LocalFile[];
  title: string;
  subtitle: string;
  description: string;
  sizeAndPrice: SizeAndPrice[];
  category: string;
  tags?: string[];
  ratings?: {
    user: string;
    rating: number;
  }[];
  brand?: string;
  modelDetails?: string;
  color?: string;
  material?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
};

export type ProductPayloadWithoutImages = Omit<ProductPayload, "files">;

export type ProductResponse = {
  _id: string;
  files: { filename: string; url: string }[];
  title: string;
  subtitle: string;
  sizeAndPrice: SizeAndPrice[];
  user: string;
  createdAt: string;
  updatedAt: string;
};
