import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/150',
      amount: 10
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 149.99,
      imageUrl: 'https://via.placeholder.com/150',
      amount: 5
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/150',
      amount: 8
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  addToCart(productId: number): void {
    const products = this.productsSubject.value;
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1 && products[productIndex].amount > 0) {
      products[productIndex].amount--;
      this.productsSubject.next([...products]);
    }
  }
} 