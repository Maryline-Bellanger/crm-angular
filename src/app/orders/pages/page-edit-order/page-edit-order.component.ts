import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss']
})
export class PageEditOrderComponent implements OnInit {

  public title: string = 'Modifier une commande';

  public item$!: Observable<Order>;

  constructor(
    // utiliser une fonctionnalité Angular pour extraire l'élément
    // dynamique de l'url qui est :id
    private activatedRoute : ActivatedRoute,
    private ordersService : OrdersService,
    private router: Router
  ) {
    // utilisation de actifatedRoute pour trouver l'id
    const id =  Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(typeof(id),id, 'id de objet');

    // this.ordersService.getItemById(id).subscribe((data) => {
    //   console.log(data);
    //   this.item = data;
    // })
    this.item$ = this.ordersService.getItemById(id);

  }

  ngOnInit(): void {
  }

  public onEdit(item: Order){
    console.log(item);
    this.ordersService.update(item).subscribe(() => {
      this.router.navigate(['orders']);
    });
  }



}
