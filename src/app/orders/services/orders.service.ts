import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

// décorateur
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  //urlApi
  private urlApi = environment.urlApi;

  private collection$ : BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);


  constructor(private http: HttpClient) {
    console.log(this.collection, 'refresh constructor')
    this.refreshCollection();
  }

  public refreshCollection() : void {
    this.http.get<Order[]>(`${this.urlApi}/orders`).pipe(
      map((tab) =>{
        return tab.map((obj) => {
          return new Order(obj);
        })
      })
    ).subscribe((data) => this.collection$.next(data));
  }

  // getter this.collection
  get collection(): Observable<Order[]>{
    return this.collection$;
    console.log(this.collection$, "get collection")
  }

  // setter this.collection = valeur
  //set collection(col: BehaviorSubject<Order[]>){
  //  this.collection$ = col;
  //}

  // méthode pour changer l'état(state)
  changeState(item: Order, state: StateOrder): Observable<Order> {
    // créer un nouvel object avec item + state
    const obj = new Order({...item});
    //modifier l'état dans obj
    obj.state = state;
    // déclancher update(obj)
    return this.update(obj);
  }

  // méthod update(obj) appel API
  update(obj: Order): Observable<Order>{
    console.log(obj, 'depuis update');
    // appel API
    return this.http.put<Order>(`${this.urlApi}/orders/${obj.id}`, obj).pipe(
      tap(() => {this.refreshCollection()})
    );
  }

  add(item: Order):Observable<any>{
    console.log(item, "depuis ajouter")
    return this.http.post<Order>(`${this.urlApi}/orders`, item).pipe(
      tap(() => { this.refreshCollection()})
    );
  }

  getItemById(id: number): Observable<any>{
    return this.http.get<Order>(`${this.urlApi}/orders/${id}`);
  }

  public delete(item: Order): Observable<any>{
    console.log(item, "depuis delete")
    return this.http.delete<Order>(`${this.urlApi}/orders/${item.id}`).pipe(
      tap(() => this.refreshCollection())
    );
  }

}
