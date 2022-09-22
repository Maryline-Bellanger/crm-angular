import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private collection$ !: Observable<Client[]>;

  constructor(private http: HttpClient) {
    this.collection = this.http.get<Client[]>('http://localhost:3000/clients');
   }

   get collection(): Observable<Client[]>{
    return this.collection$;
   }

   set collection(col: Observable<Client[]>) {
    this.collection$ = col;
   }
}
