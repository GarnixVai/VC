import { IConfiguration, IDelta } from './../../interfaces/data.interface';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DataService } from "./../../services/data.service";
import { DataStoreService } from "./../../services/data-store.service";
import { BehaviorSubject, combineLatest, Observable, of, Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { tap, map } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
@Component({
  selector: 'app-configuraion-list',
  templateUrl: './configuraion-list.component.html',
  styleUrls: ['./configuraion-list.component.scss']
})
export class ConfiguraionListComponent implements OnInit {

  private destroyed$ = new Subject<boolean>();
  public data: any; 
  public mode: ProgressSpinnerMode = 'determinate';

  // table of configurations
  // public configurations$: Observable<IConfiguration[]> = this.dataStoreService.configurationList;
  public configurations: Observable<IConfiguration[]> = 
  combineLatest([this.dataStoreService.allConfigurations, this.dataStoreService.allDelta]).pipe(
    map(([config, allDelta]) => { 
      return config;
    })
);
  // Display table
  public readonly configColDef = ["name", "owner", "latestChange"];
  public dataSource: any;
  // Pagination
  @ViewChild(MatPaginator) paginator: any;

  // Check data loading status 
  public readonly loadingStates = {
    blockRawUnit: false,
    blockchainItem: false
  }


  constructor(
    private dataService: DataService,
    private dataStoreService: DataStoreService,
    private stringify: StringifyService,
    private datePipe: DatePipe,
    private router : Router,
    private dialog: MatDialog) {
  }


  // set up
  ngOnInit(): void {
    this.configurations.pipe(
      tap((result)=>{
        this.data = new MatTableDataSource<IConfiguration>(result);
        this.data.paginator = this.paginator;
      })
    ).subscribe();

  /**
   * Main Table Content
   */
    // this.dataService.fetchMockConfigData().pipe(
    //   takeUntil(this.destroyed$),
    //   map((e) => {
    //     for (let i of e) {
    //       const d = new Date(parseInt(i.latestChange));
    //       i.latestChange = this.datePipe.transform(d, "dd-MM h:mm:ss");
    //     }
    //     return e;
    //   }),
    //   tap(result => {
    //     this.data = new MatTableDataSource<IConfiguration>(result);
    //     // this.dataSource.paginator = this.paginator;
    //   })
    // ).subscribe();

    this.dataService.loadAllConfigurations();
    setTimeout(()=> this.dataService.loadAllDeltaData(), 1000)
    // this.dataService.loadMockConfigData();
    // this.dataService.loadAllDeltaData();
    // this.dataService.loadMockDeltaData();
     
  }
  public viewConfiguration(unit: IConfiguration){
    this.router.navigate(["/configure", unit.id]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
