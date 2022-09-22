import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit {

  orders!: Order[];

  constructor(private ordersService: OrdersService) {
    // déclencher le getter
    this.ordersService.collection.subscribe((data) => {
      this.orders = data;
      console.log(this.orders);
    })
   }

  ngOnInit(): void {
  }

}
