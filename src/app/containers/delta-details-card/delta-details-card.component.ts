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
  selector: 'app-delta-details-card',
  templateUrl: './delta-details-card.component.html',
  styleUrls: ['./delta-details-card.component.scss']
})
export class DeltaDetailsCardComponent implements OnInit, AfterViewInit {

  public arrayOfJsons: any;
  public arrayOfRoles: any;
  public arrayOfMeta: any;
  public arrayOfMetaKeys: string[] = [];

  /** For switch the change region*/
  public techChange: boolean = false;
  public metaChange: boolean = false;
  @ViewChild(MatPaginator) paginator: any;

  /** Table for dispalying roles */
  displayedFeaturesTx: string[] = ['name', 'permission'];
  constructor(public dialogRef: MatDialogRef<DeltaDetailsCardComponent>,
    private dataService: DataService,
    private dataStoreService: DataStoreService,
    public stringifyService: StringifyService,
    @Inject(MAT_DIALOG_DATA) public data: IViewUnitDialogData) { }

  ngOnInit(): void {
    this.arrayOfJsons = this.data.unit;
    // this.arrayOfRoles = new MatTableDataSource<IRole>(this.data.unit.);
    // this.arrayOfRoles = this.arrayOfJsons.change.techData;
    if(this.arrayOfJsons.change.techData){
      this.techChange = true;
      this.arrayOfRoles = new MatTableDataSource<IRole>(this.arrayOfJsons.change.techData.roles);
     }
     if(this.arrayOfJsons.change.metaData){
      this.metaChange = true;
      this.arrayOfMeta = this.arrayOfJsons.change.metaData;
      this.arrayOfMetaKeys = Object.keys(this.arrayOfMeta);
      const index = this.arrayOfMetaKeys.indexOf("configManager", 0); 
      if(index > -1){
        this.arrayOfMetaKeys.splice(index, 1);
      }
      console.log("meta:", this.arrayOfMeta, this.arrayOfMetaKeys);
     }
    // console.log("data:", this.arrayOfJsons,  this.arrayOfRoles);
  }

  close(){
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.arrayOfRoles.paginator = this.paginator;
  }


}
