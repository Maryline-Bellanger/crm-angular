import { StateOrder } from "../enums/state-order";

export class Order {
  tjmHt = 1200;
  nbJours = 1;
  tva = 20;
  state = StateOrder.OPTION;
  typePresta !: string;
  client !: string;
  comment !: string;
  // ici on ajoute directement les méthodes
  id !: number;
  totalHT(): number {
    return this.tjmHt * this.nbJours;
  }
  totalTTC(): number {
    return this.tjmHt * this.nbJours * (1 + this.tva/100);
  }
  constructor(obj ?: Partial<Order>){
    if(obj){
      Object.assign(this, obj);
    }
  }
}
