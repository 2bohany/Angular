import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    // Implement checkout logic here
    alert('Checkout functionality coming soon!');
  }
} 