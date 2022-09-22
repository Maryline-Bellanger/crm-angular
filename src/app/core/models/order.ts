import { StateOrder } from "../enums/state-order";

export class Order {
  tjmHt = 1200;
  nbJours = 1;
  tva = 20;
  state = StateOrder.OPTION;
  typePresta !: string;
  client !: string;
  comment !: string;
  id !: number;
  constructor(obj ?: Partial<Order>){
    if(obj){
      Object.assign(this, obj);
    }
  }
}
