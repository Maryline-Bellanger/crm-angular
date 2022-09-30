import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-add-client',
  templateUrl: './page-add-client.component.html',
  styleUrls: ['./page-add-client.component.scss']
})
export class PageAddClientComponent implements OnInit {

  public title: string = 'Ajouter un client';

  public item: Client = new Client();

  constructor(
    private clientsService : ClientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onAdd(obj: Client) {
    this.clientsService.add(obj).subscribe(() => {
      this.router.navigate(['clients']);
    })
  }

}
