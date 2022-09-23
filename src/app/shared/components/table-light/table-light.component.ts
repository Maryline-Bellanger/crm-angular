import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-table-light',
  templateUrl: './table-light.component.html',
  styleUrls: ['./table-light.component.scss']
})
export class TableLightComponent implements OnInit {

  @Input() headers !: string[];

  // déclanché une seule fois
  constructor() {
   }

   // déclanché une seule fois
  ngOnInit(): void {
  }

  // déclanché plusieurs fois
  ngOnChanges() {
  }

}
