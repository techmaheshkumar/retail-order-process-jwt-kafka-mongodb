import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/model/cart';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productsInCart: Cart[] = [];
  public products: Product[] = [];
  public selectedCategory!: number;
  public isProductLoading = false;
  constructor(
    private productService: ProductService, public router: Router,
    private snackBar: MatSnackBar) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(): any {
    this.isProductLoading = true;
    this.productService.fetchAllProducts().subscribe(result => {
      this.products = result.data;
      this.isProductLoading = false;
    });
  }

  onAddToCart(product: Product): void {
    this.productService.cart$.next(product);
  }

}
