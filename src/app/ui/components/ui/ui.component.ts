import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  public open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(){
    //console.log('cliqué');
    //faire alterner open de true à false

    this.open = !this.open;

  }

} // ne rien écrire après cette ligne
