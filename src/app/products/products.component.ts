import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products
      .filter(product => 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let comparison = 0;
        switch (this.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'amount':
            comparison = a.amount - b.amount;
            break;
          default:
            comparison = 0;
        }
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSort(property: string): void {
    if (this.sortBy === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = property;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  addToCart(product: Product): void {
    if (product.amount > 0) {
      this.cartService.addToCart(product);
      this.productsService.addToCart(product.id);
    }
  }
} 