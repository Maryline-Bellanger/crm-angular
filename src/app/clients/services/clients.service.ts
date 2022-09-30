import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  //urlApi
  private urlApi = environment.urlApi;

  private collection$ !: Observable<Client[]>;

  constructor(private http: HttpClient) {
    this.collection = this.http.get<Client[]>(`${this.urlApi}/clients`).pipe(
      map((tab) =>{
        return tab.map((obj) => {
          return new Client(obj);
        })
      })
   );
  }

   get collection(): Observable<Client[]>{
    return this.collection$;
   }

   set collection(col: Observable<Client[]>) {
    this.collection$ = col;
   }

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
    return this.http.put<Client>(`${this.urlApi}/clients/${obj.id}`, obj);
  }

  add(item: Client):Observable<Client>{
    return this.http.post<Client>(`${this.urlApi}/clients`, item);
  }

  getItemById(id: number): Observable<Client>{
    return this.http.get<Client>(`${this.urlApi}/clients/${id}`);
  }
}
