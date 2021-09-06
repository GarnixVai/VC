import { Injectable } from '@angular/core';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { IConfiguration, IDelta } from "../interfaces/data.interface";
import { DataStoreService } from './data-store.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private dataStore: DataStoreService) {
  }

  public loadAllConfigurations():void{
    this.http.get<IConfiguration[] | any>(`api/v1/configurationList`).pipe(
      tap(result => this.dataStore.allConfigurations.next(result)),
      catchError(this.handleError)
    ).subscribe();
  }
  public loadAllDeltaData(): void {
    this.http.get<IDelta[]>(`api/v1/deltaList`).pipe(
      tap(result => this.dataStore.allDelta.next(result)),
      catchError(this.handleError)
    ).subscribe();
  }
  public loadMockConfigData(): void {
    this.http.get<IConfiguration[]>(`/assets/data/mockConfigData.json`).pipe(
      /** temporarily for mocking database */
      map(result => {
        const exist = this.dataStore.allConfigurations.getValue();
        if (exist.length) return exist;
        else return result;
      }),
      tap(result => this.dataStore.allConfigurations.next(result)),
      catchError(this.handleError)
    ).subscribe();
  }

  public loadMockDeltaData(): void {
    this.http.get<IDelta[]>(`/assets/data/mockDeltaData.json`).pipe(
      /** temporarily for mocking database */
      map(result => {
        const exist = this.dataStore.allDelta.getValue();
        if (exist.length) return exist;
        else return result;
      }),
      tap(result => this.dataStore.allDelta.next(result)),
      catchError(this.handleError)
    ).subscribe();
  }

  public saveDelta(delta: IDelta): Observable<IDelta> {
    return this.http.post<IDelta>("api/v1/delta", delta);
  }
  public updateConfig(config: IConfiguration, id: number):Observable<IConfiguration> {
    return this.http.post<any>(`api/v1/configuration/${id}`, config);
  }

  public saveConfig(config: IConfiguration): Observable<IConfiguration> {
    return this.http.post<IConfiguration>("api/v1/configurations", config);
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
