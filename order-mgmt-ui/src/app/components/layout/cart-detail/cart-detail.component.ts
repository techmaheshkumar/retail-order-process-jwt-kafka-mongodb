import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/shared/model/product';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/shared/model/order';
import { OrderItem } from 'src/app/shared/model/order-item';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  public products: Product[] = [];
  displayedColumns: string[] = ['name', 'qty', 'price', 'total'];
  constructor(private prodService: ProductService, public router: Router, private snackBar: MatSnackBar,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.products = this.prodService.getCart();
  }

  public getTotalCost(): number {
    let total = 0;
    this.products?.forEach(cart => {
      total = total + cart.total;
    });
    return total;
  }

  public placeOrder(): void {
    const order = new Order();
    order.totalPrice = this.getTotalCost();
    const userId = localStorage.getItem('id');
    if (userId) {
      order.userId = userId;
    }
    const orderItems: OrderItem[] = [];
    this.products.forEach((prod) => {
      const orderItem = new OrderItem();
      orderItem.price = prod.price;
      orderItem.productId = prod.id;
      orderItem.qty = prod.qty;
      orderItems.push(orderItem);
    });
    order.orderItems = orderItems;
    this.orderService.placeOrder(order).subscribe(result => {
      if (result.status === 201) {
        this.snackBar.open('Order Created Successfully', 'Success', {
          duration: 2000,
        });
        this.prodService.cart$.next(null);
        this.router.navigateByUrl('/orders');
      } else {
        this.snackBar.open('Order Created Failed', 'Failed', {
          duration: 2000,
        });
      }
    });
  }
}
