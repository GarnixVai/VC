import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { IBlockRawUnit, Itransaction } from "../interfaces/block-chain";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpClient) {
  }
  private API = "https://blockchain.info/blocks?format=json";
  private API1 = "https://blockchain.info/blocks/1573858800000?format=json";
  private APIURL = "https://randomuser.me/api/";
  private API2 = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD";
  private API3 = "https://min-api.cryptocompare.com/data/symbol/histoday?fsym=ETH&tsym=USD&limit=100";
  private apiURL: string = 'https://jsonplaceholder.typicode.com/todos/1';

  public fetchFakeData(): Observable<any> {
    return this.http.get('/assets/data/data.json');
  }
  public loadBlockchainInfo() {
    // return this.http.jsonp<any>(this.API1, 'jsoncallback').pipe(
    //     tap(result => {
    //       console.log(result);
    //       // this.dataStore.allTenants.next(result)
    //     }),
    //     catchError(this.handleError)
    // ).subscribe();

    //  this.http.get(this.APIURL).pipe(
    //   tap(result=>{
    //     console.log(result);
    //   })
    // ).subscribe();

    // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

    // axios.get(this.API1)
    // .then(function(response){
    //   console.log(response);
    // })
  }

  public loadBlockRawUnit(id: string) {
    return this.http.get<IBlockRawUnit>(`https://blockchain.info/rawblock/${id}`).pipe(
      catchError(this.handleError)
    ).toPromise();
  }
  public loadTransaction(id: string) {
    return this.http.get<Itransaction>(`https://blockchain.info/rawtx/${id}`).pipe(
      catchError(this.handleError)
    )
      .toPromise();

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Please try again.');
  }
}
