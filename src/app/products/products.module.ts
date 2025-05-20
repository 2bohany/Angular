import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ProductsComponent
  ]
})
export class ProductsModule { } 