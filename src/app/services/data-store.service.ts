import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {map, filter} from "rxjs/operators";
import { IConfiguration, ITableConfiguration, IMetaData, ITechData, IRole, IDelta } from "../interfaces/data.interface";

@Injectable({
    providedIn: "root"
})

export class DataStoreService {
    public allConfigurations: BehaviorSubject<IConfiguration[]> = new BehaviorSubject<IConfiguration[]>([]); 
    public allDelta: BehaviorSubject<IDelta[]> = new BehaviorSubject<IDelta[]>([]);
    public deltaList: BehaviorSubject<IDelta[]> = new BehaviorSubject<IDelta[]>([]);
    public selectedDelta: BehaviorSubject<any> = new BehaviorSubject<any>((null));
    public selectedConfiguration: BehaviorSubject<any> = new BehaviorSubject<any>(null);

   
    constructor() {
        this.allDelta.pipe(
            map(config => config.filter(t => t.id !== this.selectedDelta.value.config_id))
        ).subscribe(this.deltaList);
        
    }

    public updateConfiguraion(id: number, delta){
        const result:IConfiguration[] = this.allConfigurations.getValue();
        for (const e of result) {
            if (e.id === id) {
                /**  update configuration:
                 *  
                */
                e.latestChange = delta.timestamp;
                break;
            }
        }

        this.allConfigurations.next(result);
    }

    public getConfiguration(id: number){
        console.log("configuration:", id);
        return this.allConfigurations.getValue().filter(config=>config.id==id);
    }
    public getDelta(id: number){
        console.log("delta:", id);
        return this.allDelta.getValue().filter(delta=>delta.id==id)[0];
    }

    public getDeltaList(id: number){
        return this.allDelta.getValue().filter(config=>config.config_id==id);
    }

    public saveDelta(copy: IDelta){
        const result = this.allDelta.getValue();
        console.log("before update:", result);
        result.push(copy);
        console.log("update:", result);
        this.allDelta.next(result);
        this.updateConfiguraion(copy.config_id, copy);
    }

    public saveConfig(copy: IConfiguration){
        const result = this.allConfigurations.getValue();
        result.push(copy);
        this.allConfigurations.next(result);
    }

}