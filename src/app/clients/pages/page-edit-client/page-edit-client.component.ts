import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-edit-client',
  templateUrl: './page-edit-client.component.html',
  styleUrls: ['./page-edit-client.component.scss']
})
export class PageEditClientComponent implements OnInit {

  public title: string = 'Modifier un client';

  public item$!: Observable<Client>;

  constructor(
    private activatedRoute : ActivatedRoute,
    private clientsService : ClientsService,
    private router: Router
  ) {
    const id =  Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(typeof(id),id, 'id du client');
    this.item$ = this.clientsService.getItemById(id);
   }

  ngOnInit(): void {
  }

  public onEdit(item: Client){
    console.log(item);
    this.clientsService.update(item).subscribe(() => {
      this.router.navigate(['clients']);
    });
  }
}
