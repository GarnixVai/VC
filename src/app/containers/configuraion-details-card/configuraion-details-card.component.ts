import { IDelta, IRole, IMetaData, IConfiguration } from './../../interfaces/data.interface';
import { DataService } from './../../services/data.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { catchError, distinctUntilChanged, filter, map, switchMap, switchMapTo, takeUntil, tap } from "rxjs/operators";
import { ViewBlockRawUnitComponent } from "./../view-block-raw-unit/view-block-raw-unit.component";
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from "@angular/core";
import { Subject, BehaviorSubject, Observable, combineLatest } from "rxjs";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
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
  /** Synce Data */
  private destroyed$ = new Subject<boolean>();
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
    console.log("ss:", this.arrayOfJsons);
    this.arrayOfOrigins = JSON.parse(JSON.stringify(this.arrayOfJsons));

    console.log("jones:", this.arrayOfJsons);
    this.arrayOfRoles = new MatTableDataSource<IRole>(this.arrayOfJsons.techData.roles);
    // delete this.arrayOfJsons.tx;
    // this.arrayOfKeys = Object.keys(this.data.unit);

  }



  ngAfterViewInit() {
    this.arrayOfRoles.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public close() {
    this.dialogRef.close();
  }
  public compareObject() {
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
    for (var key in oldTech) {
      if (JSON.stringify(newTech[key]) !== JSON.stringify(oldTech[key])) {
        console.log("key:", key, newTech[key], oldTech[key]);
        if (!delta.change.tech) {
          delta.change["tech"] = {
            config_id: config_id,
            roles: []
          }
        }
        tech = true;
        delta.change.tech.roles.push({ name: key, permission: newTech[key] })
      }
    }
    // metaData
    let meta = false;
    const metaData: IMetaData = {
      config_id: config_id,
      configManager: newInfo.configManager
    }
    if (oldInfo.name != newInfo.name) {

      delta["name"] = newInfo.name;
      metaData["name"] = newInfo.name;
      meta = true;
    }
    if (oldInfo.owner != newInfo.owner) {
      metaData["owner"] = newInfo.owner;
      meta = true;
    }
    if (meta) delta.change["meta"] = metaData;
    console.log("res:", delta)
    return (tech || meta) ? delta : null;
  }
  public update() {
    const res = this.compareObject();
    if (res) {
      this.arrayOfOrigins =  JSON.parse(JSON.stringify(this.arrayOfJsons));
      this.dataStoreService.saveDelta(res);
      this.close();
      // this.dataService.saveDelta(res);
    } else {
      alert("You haven't update any data.")
    }

  }


}
