import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  getCartTotal(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems.subscribe(items => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        observer.next(total);
      });
    });
  }

  getCartItemCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(count);
      });
    });
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
} 