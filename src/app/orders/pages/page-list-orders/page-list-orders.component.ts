import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    'Action',
    'Type',
    'Client',
    'NbJours',
    'Tjm HT',
    'Total HT',
    'Total TTC',
    'Statut',
    'Commentaires',
  ];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    ) {
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

  //méthode pour changer le state
  public changeState(item: Order, event: Event) {
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateOrder;

    this.ordersService.changeState(item, state).subscribe(data=>{
      // modifier item
      Object.assign(item, data);

    })
  }

  // créer une méthode pour calcuer TotalHT et total TTC
  // public total(val: number, coef: number, tva?: number){
  //   console.log('fonction total')
  //   if(tva){
  //     return val * coef * (1 + tva/100);
  //   }
  //   return val * coef;
  // }

  public onEdit(item: Order){
    console.log(item);
    this.router.navigate(['orders', 'edit', item.id]);
  }

  public onDelete(item: Order): void{
    this.ordersService.delete(item).subscribe();
  }

}
