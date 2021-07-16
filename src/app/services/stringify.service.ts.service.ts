import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringifyService {

  constructor() { }

  public formalizeBlockRawUnit(s: string): string{
    switch(s){
      case "prev_block":
        s = "previous_block";
        break;
      case "n_tx":
        s = "Tx";
        break;
      case "mrkl_root":
        s = "merkle_root";
        break;
      default:
        break;
    }
      const res = s.split("_").map(e => e.charAt(0).toUpperCase() + e.slice(1));
      return res.join(" "); 
  }
}
