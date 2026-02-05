import { Types } from "mongoose";

export type ProductStatus = 'enable' | 'disable';

export enum ProductBadge {
  HOT = 'Hot Deal',
  NEW = 'New',
  SALE = 'Sale',
  FEATURED = 'Featured',
  LIMITED = 'Limited Offer',
}

export interface IProductMeta {
  title: string;
  description: string;
  keyword: string[];
}

export interface IProduct  {
  name: string;
  slug?: string;
  description: string;
  category: Types.ObjectId;

  price?: number;
  originalPrice?: number;
  discount?: number;

  images: string[];
  badge?: ProductBadge;

  freeShipping?: boolean;
  freeGift?: boolean;
  isNewArrivals?: boolean;
  isBestDeal?: boolean;

  stock: boolean;
  status: ProductStatus;

  meta: IProductMeta;
}



