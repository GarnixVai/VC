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
    console.log("service");
    return this.http.get('/assets/data/mockConfigData.json');
  }

  public fetchMockDeltaData(): Observable<any> {
    return this.http.get('/assets/data/mockDeltaData.json');
  }

    public loadMockConfigData(): void {
    this.http.get<IConfiguration[]>(`/assets/data/mockConfigData.json`).pipe(
        tap(result => this.dataStore.allConfigurations.next(result)),
        catchError(this.handleError)
    ).subscribe();
}

    public loadMockDeltaData(): void {
    this.http.get<IDelta[]>(`/assets/data/mockDeltaData.json`).pipe(
        tap(result => this.dataStore.allDelta.next(result)),
        catchError(this.handleError)
    ).subscribe();
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
