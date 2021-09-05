import { IDelta, IRole, IMetaData } from './../../interfaces/data.interface';
import { DataService } from './../../services/data.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { trigger, state, style, animate, transition} from '@angular/animations';
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ViewBlockRawUnitComponent } from "./../view-block-raw-unit/view-block-raw-unit.component";
import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit} from "@angular/core";
import {Subject} from "rxjs";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter} from 'rxjs/operators';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

export interface IViewUnitDialogData {
  unit: any;
}
@Component({
  selector: 'app-configuraion-details-card',
  templateUrl: './configuraion-details-card.component.html',
  styleUrls: ['./configuraion-details-card.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class ConfiguraionDetailsCardComponent implements OnInit, AfterViewInit {
  public arrayOfKeys: string[] = [];
  public arrayOfJsons: any;
  public arrayOfRoles: any;
  public arrayOfOrigins: any;
  public message = "";
  @ViewChild(MatPaginator) paginator: any;

  /** Table for dispalying roles */
  displayedFeaturesTx: string[] = ['name', 'permission'];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('details');
  expandedElement: any;
  isTableExpanded = false;


  constructor(public dialogRef: MatDialogRef<ViewBlockRawUnitComponent>,
    private dataService: DataService,
    private dataStoreService: DataStoreService,
    public stringifyService: StringifyService, 
    @Inject(MAT_DIALOG_DATA) public data: IViewUnitDialogData) { }

  ngOnInit(): void {
    this.arrayOfJsons = this.data.unit;
    this.arrayOfOrigins = JSON.parse(JSON.stringify(this.arrayOfJsons));

    console.log("jones:", this.arrayOfJsons);
    this.arrayOfRoles = new MatTableDataSource<IRole>(this.arrayOfJsons.techData.roles);
    // delete this.arrayOfJsons.tx;
    // this.arrayOfKeys = Object.keys(this.data.unit);
  }

  
  ngAfterViewInit() {
    this.arrayOfRoles.paginator = this.paginator;
  }

  public close() {
    this.dialogRef.close();
  }
  public compareObject(){
      const config_id = this.arrayOfJsons.id;

      const oldTech = this.arrayOfOrigins.techData.roles;
      const newTech = this.arrayOfJsons.techData.roles;
      const oldInfo = this.arrayOfOrigins;
      const newInfo = this.arrayOfJsons;

      var delta: IDelta = {
        config_id: config_id,
        editor: this.arrayOfJsons.metaData.configManager,
        message: this.message,
        timestamp: new Date(),
        change: {}
      };
     
      let tech = false;
      // techData
      for(var key in oldTech){
        console.log("new:", JSON.stringify(newTech[key]));
        console.log("old:", JSON.stringify(oldTech[key] ));
        console.log(JSON.stringify(newTech[key])!=JSON.stringify(oldTech[key]));
        if(JSON.stringify(newTech[key])!==JSON.stringify(oldTech[key])){
          console.log("key:", key, newTech[key], oldTech[key]);
          if(!delta.change.tech){
            delta.change["tech"] = {
              config_id: config_id,
              roles: []
            }
          }
          tech = true;
          delta.change.tech.roles.push({name: key, permission: newTech[key]})
        }
      }
      // metaData
      let meta = false;
      const metaData: IMetaData = {
        config_id: config_id,
        configManager: newInfo.configManager
      }
      console.log(oldInfo, newInfo);
      if(oldInfo.name!=newInfo.name) {
       
        delta["name"] = newInfo.name;
        metaData["name"] = newInfo.name;
        meta = true;
      }
      if(oldInfo.owner!=newInfo.owner) {
        metaData["owner"] = newInfo.owner;
        meta = true;
      }
      if(meta) delta.change["meta"] = metaData;
      console.log(tech, meta, tech || meta);
      return tech || meta ? delta: null; 
  }
  public update(){
    
    // console.log("new:", this.arrayOfJsons);
    // console.log("old:", this.arrayOfOrigins);
    const res = this.compareObject();
    if(res){
      console.log("save!");
    }else{
      alert("You haven't update any data.")
    }

  }


}
