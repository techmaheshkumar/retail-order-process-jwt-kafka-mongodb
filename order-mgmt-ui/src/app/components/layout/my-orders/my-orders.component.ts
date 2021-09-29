import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public orders: Order[] = [];
  displayedColumns: string[] = ['id', 'date', 'status', 'totalPrice', 'orderItems'];
  constructor(private orderService: OrderService) {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.orderService.getOrders(userId).subscribe(data => {
        this.orders = data.data;
      });
    } else {
      console.log('userId null');
    }
  }

  ngOnInit(): void {
  }

}
