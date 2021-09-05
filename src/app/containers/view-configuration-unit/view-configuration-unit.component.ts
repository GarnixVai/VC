import { takeUntil } from 'rxjs/operators';
import { IDelta, IConfiguration } from './../../interfaces/data.interface';
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
// import { ViewBlockRawUnitComponent } from "./../view-block-raw-unit/view-block-raw-unit.component";
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit,OnDestroy , Output, SimpleChanges, ViewChild, AfterViewInit } from "@angular/core";
import { Subject, combineLatest, Observable, BehaviorSubject, config } from "rxjs";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter, tap } from 'rxjs/operators';
import { ConfiguraionDetailsCardComponent } from "./../configuraion-details-card/configuraion-details-card.component";
@Component({
  selector: 'app-view-configuration-unit',
  templateUrl: './view-configuration-unit.component.html',
  styleUrls: ['./view-configuration-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewConfigurationUnitComponent implements OnInit, OnDestroy {
  public data: any;
  public id: number;
  public appInfo: any;
  public deltaList: any;
  private destroyed$ = new Subject<boolean>();

  public currentConfiguration: Observable<IConfiguration> =
    combineLatest([this.dataStoreService.allConfigurations, this.dataStoreService.allDelta]).pipe(
      map(([config, allDelta]) => { 
        const result = config.filter(el => el.id == this.id)[0]
        return result;
      })
  );
  public selectedConfiguration: BehaviorSubject<IConfiguration | null> = new BehaviorSubject<IConfiguration | null>(null);

  public currentDelta: Observable<IDelta[]> = this.dataStoreService.allDelta.pipe(
    map(()=> this.dataStoreService.getDeltaList(this.id))
  )

  // public selectedConfiguration = this.currentConfiguration.pipe(
  //   map(tenants => tenants.filter(tenant => tenant.noted))
  // );

  // Display table
  public readonly deltaColDef = ["editor", "message", "time"];

  constructor(
    private dataService: DataService,
    private dataStoreService: DataStoreService,
    private stringify: StringifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.id = res['id'];
      this.fetchData();
      


    });

    this.updateTable();
    this.selectedConfiguration.pipe(
      takeUntil(this.destroyed$),
      // this.dataService.load()
      tap(() => {
        // this.dataStoreService.getConfiguration(this.id)
      })
    ).subscribe();
  }
  public updateTable() {
    //   if (this.entities == null || this.entities.length === 0) {
    //     return;
    // }
  }
  public setSelectedConfiguration(configuration: IConfiguration){
    this.selectedConfiguration.next(configuration);
    this.dataStoreService.selectedConfiguration.next(configuration);
  }

  public fetchData() {
    this.appInfo = this.dataStoreService.getConfiguration(this.id);
    this.dataStoreService.selectedConfiguration.next(this.appInfo);
    this.deltaList = this.dataStoreService.getDeltaList(this.id);
    if (!this.appInfo || !this.appInfo.length) {
      this.router.navigate(["home"]);
    } else {
      this.appInfo = this.appInfo[0];
      this.appInfo.latestChange = this.stringify.secondsToDateTime(this.appInfo.latestChange);
      // this.appInfo.latestChange = this.datePipe.transform(d, "dd-MM h:mm:ss");
      this.deltaList.forEach(element => {
        element.time = this.stringify.secondsToDateTime(element.timestamp);
      });
      console.log(this.appInfo, this.deltaList);
      this.setSelectedConfiguration(this.appInfo);
    }
  }
  public updateConfiguration() {
    console.log(this.appInfo)
    this.openDialog(this.appInfo, true);

  }
  // should show the delta
  public showDelta(unit: any) {
    this.openDialog(this.appInfo);
  }
  // action = false: readonly
  public async openDialog(unit: any, action = false) {
    // this.loadingStates.blockRawUnit = true;
    // // let detailedUnit: IBlockRawUnit | any;
    // if (unit?.hash !== undefined) {
    //   detailedUnit = await this.dataService.loadBlockRawUnit(unit.hash);
    // }
    // this.loadingStates.blockRawUnit = false;
    const dialogRef = this.dialog.open(ConfiguraionDetailsCardComponent, {
      width: '80%',
      data: { unit: unit || {}, readonly: action ? false : true }
    });

  }
  ngOnDestroy():void{
    this.destroyed$.next(true);
    this.destroyed$.complete();

  }


}
