import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appState]'
})
export class StateDirective {

  // récupère une valeur d'un parent
  @Input() etat!: string;
  @HostBinding('class') tdClassName!: string;

  constructor() {

   }

   ngOnInit(){

   }

   ngOnChanges(){
    this.tdClassName = `state-${this.etat.toLowerCase()}`;
   }
}
