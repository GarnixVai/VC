import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class StringifyService {

  constructor( private datePipe: DatePipe) { }

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

  public secondsToDateTime(t){
    const d = new Date(parseInt(t));
    return this.datePipe.transform(d, "dd-MM h:mm:ss");
  }
}
