export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
