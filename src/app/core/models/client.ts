import { StateClient } from "../enums/state-client";

export class Client {
  tva = 20;
  state = StateClient.ACTIVE;
  totalCaHt !: number;
  name !: string;
  comment !: string;
  id !: number;
  constructor(obj ?: Partial<Client>){
    if(obj){
      Object.assign(this, obj);
    }
  }
}
