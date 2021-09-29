import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/shared/model/product';
import { ThemePalette } from '@angular/material/core';
import { Orientation } from '@ngmodule/material-carousel';
import { Router } from '@angular/router';
import { isLoggedInUser } from 'src/app/shared/util/storage.util';
import { Cart } from 'src/app/shared/model/cart';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {

  prod: Product = new Product();

  @Input() set product(product: Product) {
    if (product) {
      this.prod = this.fillCartDetails(product);
    }
  }
  @Input() disableQty = false;

  @Output() addToCart = new EventEmitter<Product>();

  public slidesList = new Array<never>(1);
  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = false;
  public interval = 5000;
  public loop = false;
  public hideArrows = true;
  public hideIndicators = true;
  public color: ThemePalette = 'accent';
  public maxWidth = 'auto';
  public maintainAspectRatio = true;
  public proportion = 75;
  public slideHeight = '500px';
  public slides = this.slidesList.length;
  public overlayColor = '#00000040';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';
  public log: string[] = [];
  public cartData: Cart[] = [];
  public qty = 1;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  public addToCartAction(): void {
    if (isLoggedInUser()) {
      this.prod.qty = this.qty;
      this.addToCart.emit(this.prod);
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  public fillCartDetails(_product: Product): Product {
    const cartData: Cart[] = this.cartData;
    const cartProd = cartData.filter(fp => fp.product.id === _product.id);
    return _product;
  }


}
