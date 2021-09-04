import { IConfiguration } from './interfaces/data.interface';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { BlockService } from './services/block.service';
import { DataService } from "./services/data.service";
import { DataStoreService } from "./services/data-store.service";
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject } from "rxjs";
import { IBlockchainItem, IBlockRawUnit } from "./interfaces/block-chain";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { takeUntil, tap, map } from "rxjs/operators";
import { ViewBlockRawUnitComponent } from "./containers/view-block-raw-unit/view-block-raw-unit.component";
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Version Control';
  name = 'Ju Huang Hua';
  private destroyed$ = new Subject<boolean>();
  public data$: any;
  public mode: ProgressSpinnerMode = 'determinate';

  // table of configurations
  public configurations: Observable<IConfiguration[]> = this.dataStoreService.configurationList;

  // Display table
  public readonly configColDef = ["name", "owner", "latestChange"]
  public readonly colDef = ["hash", "height", "time", "block_index"];
  public dataSource: any;
  // Pagination
  @ViewChild(MatPaginator) paginator: any;

  // Check data loading status 
  public readonly loadingStates = {
    blockRawUnit: false,
    blockchainItem: false
  }


  constructor(
    private dataService: BlockService,
    private dataService1: DataService,
    private dataStoreService: DataStoreService,
    private datePipe: DatePipe,
    private dialog: MatDialog) {
  }


  // set up
  ngOnInit(): void {
    // this.dataService.loadBlockchainInfo();
    this.fetchData();


    this.dataService.testDrive().pipe(
      tap(res=>{console.log(res)})
    ).subscribe()


    this.dataService1.loadMockConfigData();
    this.dataService1.loadMockDeltaData();
     
  }

  /**
   * Main Table Content
   */
  fetchData() {
    this.dataService.fetchFakeData().pipe(
      takeUntil(this.destroyed$),
      map((e) => {
        for (let i of e) {
          const d = new Date(parseInt(i.time));
          i.time = this.datePipe.transform(d, "dd-MM h:mm:ss");
        }
        return e;
      }),
      tap(result => {
        this.dataSource = new MatTableDataSource<IBlockchainItem>(result);
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  public async openDialog(unit: IBlockchainItem) {
    this.loadingStates.blockRawUnit = true;
    let detailedUnit: IBlockRawUnit | any;
    if (unit?.hash !== undefined) {
      detailedUnit = await this.dataService.loadBlockRawUnit(unit.hash);
    }
    this.loadingStates.blockRawUnit = false;
    const dialogRef = this.dialog.open(ViewBlockRawUnitComponent, {
      width: '80%',
      data: { unit: detailedUnit || {} }
    });

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
