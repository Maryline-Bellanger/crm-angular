import { StateClient } from "../enums/state-client";

export interface ClientI {
  tva : number;
  state : StateClient;
  totalCaHt : number;
  name : string;
  comment : string;
  totalTTC(): number;
  id : number;
}
