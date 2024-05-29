import { Product } from "./Product";

export interface ProductsCategory {
  id: number;
  categoryName: string;
  data: Product[];
}
