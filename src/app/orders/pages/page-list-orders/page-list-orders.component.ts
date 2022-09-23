import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit {

  public title: string = 'Liste des commandes'

  public collection$!: Observable<Order[]>;

  //déclarer une propriété pour stocker stateOrders
  // il faut le transformer en tableau !
  // Object.values est une méthode JS
  public states = Object.values(StateOrder);

  // créer un tableau avec les en-têtes
  public headers: string[] = [
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'Statut',
  ];

  constructor(private ordersService: OrdersService) {
    // déclencher le getter
    // this.ordersService.collection.subscribe((data) => {
    //   this.collection$ = data;
    //   this.headers;
    //   console.log(this.headers);
    // })
    this.collection$ = this.ordersService.collection;

   }

  ngOnInit(): void {
  }

  // créer une méthode pour calcuer TotalHT et total TTC
  // public total(val: number, coef: number, tva?: number){
  //   console.log('fonction total')
  //   if(tva){
  //     return val * coef * (1 + tva/100);
  //   }
  //   return val * coef;
  // }
}
