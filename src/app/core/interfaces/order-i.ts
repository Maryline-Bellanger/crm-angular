import { StateOrder } from "../enums/state-order";

export interface OrderI {
  action: any;
  tjmHt : number;
  nbJours : number;
  tva : number;
  state : StateOrder;
  typePresta : string;
  client : string;
  comment : string;
  id : number;
  totalHT(): number;
  totalTTC(): number;
}
