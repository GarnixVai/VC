import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, filter} from "rxjs/operators";
import { IConfiguration, ITableConfiguration, IMetaData, ITechData, IRole, IDelta } from "../interfaces/data.interface";

@Injectable({
    providedIn: "root"
})

export class DataStoreService{
    public allConfigurations: BehaviorSubject<IConfiguration[]> = new BehaviorSubject<IConfiguration[]>([]); 
    public allDelta: BehaviorSubject<IDelta[]> = new BehaviorSubject<IDelta[]>([]);
    public configurationList: BehaviorSubject<ITableConfiguration[]> = new BehaviorSubject<ITableConfiguration[]>([]);
    public deltaList: BehaviorSubject<IDelta[]> = new BehaviorSubject<IDelta[]>([]);
    public selectedDelta: BehaviorSubject<any> = new BehaviorSubject<any>((null));

   
    constructor() {
        this.allDelta.pipe(
            map(config => config.filter(t => t.id !== this.selectedDelta.value.config_id))
        ).subscribe(this.deltaList);
    }

    public updateConfiguraion(){

    }

    public getConfiguration(id: number){
        return this.configurationList.getValue().filter(config=>config.id===id);
    }

    public getDeltaList(id: number){

    }

}