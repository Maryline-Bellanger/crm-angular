import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  //urlApi
  private urlApi = environment.urlApi;

  //private collection$ !: Observable<Client[]>;
  private collection$ : BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);

  constructor(private http: HttpClient) {
  //   this.collection = this.http.get<Client[]>(`${this.urlApi}/clients`).pipe(
  //     map((tab) =>{
  //       return tab.map((obj) => {
  //         return new Client(obj);
  //       })
  //     })
  //  );
    this.refreshCollection();
  }

  public refreshCollection(): void {
    this.http.get<Client[]>(`${this.urlApi}/clients`).pipe(
      map((tab) =>{
        return tab.map((obj) => {
          return new Client(obj);
        })
      })
   ).subscribe((data) => this.collection$.next(data));
  }

   get collection(): Observable<Client[]>{
    return this.collection$;
   }

  //  set collection(col: Observable<Client[]>) {
  //   this.collection$ = col;
  //  }

    // méthode pour changer l'état(state)
  changeState(item: Client, state: StateClient): Observable<Client> {
    // créer un nouvel object avec item + state
    const obj = new Client(item);
    //modifier l'état dans obj
    obj.state = state;
    // déclancher update(obj)
    return this.update(obj);
  }

  // méthod update(obj) appel API
  update(obj:Client):Observable<Client>{
    console.log(obj, 'depuis update');
    // appel API
    return this.http.put<Client>(`${this.urlApi}/clients/${obj.id}`, obj).pipe(
      tap(() => {this.refreshCollection()})
    );
  }

  add(item: Client):Observable<Client>{
    return this.http.post<Client>(`${this.urlApi}/clients`, item).pipe(
      tap(()=>{this.refreshCollection()})
    );
  }

  getItemById(id: number): Observable<Client>{
    return this.http.get<Client>(`${this.urlApi}/clients/${id}`);
  }

  public delete(item: Client): Observable<any> {
    return this.http.delete<Client>(`${this.urlApi}/clients/${item.id}`).pipe(
      tap(()=> this.refreshCollection())
    );
}}
