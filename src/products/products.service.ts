import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  all() {
    return [...this.products];
  }

  get(id: string) {
    const product = this.findProduct(id);
    return { ...product };
  }

  add(name: string, description: string, price: number) {
    const id = Math.random().toString();
    const product = new Product(id, name, description, price);
    this.products.push(product);
    return id;
  }

  update(id: string, name: string, description: string, price: number) {
    const { idx, product} = this.findIndex(id);
    this.products[idx] = { ...product, name, description, price };
    return null;
  }

  delete(id: string) {
    this.products = this.products.filter(product => product.id !== id);
    return null;
  }

  private findProduct(id: string): Product {
    const product = this.products.find(product => product.id === id)
    if(!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  private findIndex(id: string): { idx: number, product: Product } {
    const idx = this.products.findIndex(product => product.id === id)
    const product = this.products[idx];
    if(!product) {
      throw new NotFoundException('Product not found');
    }

    return { idx, product };
  }
}
