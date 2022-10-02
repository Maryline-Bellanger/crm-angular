import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit {

  public title: string = 'Liste des clients';

  public states = Object.values(StateClient);

  public collection$!:  Observable<Client[]>;

  public headers: string[] = [
    'Action',
    'Nom',
    'Statut',
    'Total CA HT',
    'TVA',
    'Total CA TTC',
    'Commentaire',
  ]

  constructor(
    private clientsService: ClientsService,
    private router: Router) {
    // this.clientsService.collection.subscribe((data) => {
    //   this.collection = data;
    //   this.headers;
    //   console.log(this.collection);
    //   console.log(this.headers);
    this.collection$ = this.clientsService.collection;

  }

  ngOnInit(): void {

  }

  public changeState(item: Client, event: Event){
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateClient;

    this.clientsService.changeState(item, state).subscribe(data=>{
      Object.assign(item, data);
    })

  }
  public onEdit(item: Client){
    console.log(item);
    this.router.navigate(['clients', 'edit', item.id]);
  }

  public onDelete(item: Client): void{
    this.clientsService.delete(item).subscribe();
  }
}
