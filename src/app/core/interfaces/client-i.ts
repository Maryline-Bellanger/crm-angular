import { StateClient } from "../enums/state-client";

export interface ClientI {
  action: any;
  tva : number;
  state : StateClient;
  totalCaHt : number;
  name : string;
  comment : string;
  totalTTC(): number;
  id : number;
}
