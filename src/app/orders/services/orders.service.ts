import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/core/models/order';

// décorateur
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private collection$ !: Observable<Order[]>;

  constructor(private http: HttpClient) {
    this.collection = this.http.get<Order[]>('http://localhost:3000/orders').pipe(
      map((tab) =>{
        return tab.map((obj) => {
          return new Order(obj);
        })
      })
    );
  }

  // getter this.collection
  get collection(): Observable<Order[]>{
    return this.collection$;
  }

  // setter this.collection = valeur
  set collection(col: Observable<Order[]>){
    this.collection$ = col;
  }

}
