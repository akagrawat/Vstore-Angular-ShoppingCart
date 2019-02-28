import { Injectable } from '@angular/core';
import { Product } from '../shared/product';
import { PRODUCT } from '../shared/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product;

  constructor() { }

  getProducts(): Product[] {
  return PRODUCT;
  }
  getProduct(id: number): Product {
    return PRODUCT.filter((product) => (product.id === id))[0];
  }
}
