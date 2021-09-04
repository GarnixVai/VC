import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { IConfiguration, IDelta } from "../interfaces/data.interface";
import { DataStoreService } from './data-store.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private dataStore: DataStoreService) {
  }
  private API = "https://blockchain.info/blocks?format=json";

  public fetchMockConfigData(): Observable<any> {
    return this.http.get('/assets/data/mockConfigData.json');
  }

  public fetchMockDeltaData(): Observable<any> {
    return this.http.get('/assets/data/mockDeltaData.json');
  }

    public loadMockConfigData(): void {
    this.http.get<IConfiguration[]>(`/assets/data/mockConfigData.json`).pipe(
        tap(result => this.dataStore.allConfigurations.next(result))
    ).subscribe();
}

    public loadMockDeltaData(): void {
    this.http.get<IDelta[]>(`/assets/data/mockDeltaData.json`).pipe(
        tap(result => this.dataStore.allDelta.next(result))
    ).subscribe();
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
//   public testDrive(){
//     return this.http.get<any>(`http://127.0.0.1:5000/api/v1/resources/drivers/all`).pipe(
//       catchError(this.handleError)
//     )
//   }

//   public loadBlockRawUnit(id: string) {
//     return this.http.get<IBlockRawUnit>(`https://blockchain.info/rawblock/${id}`).pipe(
//       catchError(this.handleError)
//     ).toPromise();
//   }
//   public loadTransaction(id: string) {
//     return this.http.get<Itransaction>(`https://blockchain.info/rawtx/${id}`).pipe(
//       catchError(this.handleError)
//     ).toPromise();

//   }

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
