import { takeUntil } from 'rxjs/operators';
import { IDelta, IConfiguration } from './../../interfaces/data.interface';
import { DataService } from './../../services/data.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit,OnDestroy , Output, SimpleChanges, ViewChild, AfterViewInit } from "@angular/core";
import { Subject, combineLatest, Observable, BehaviorSubject, config } from "rxjs";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, filter, tap } from 'rxjs/operators';
import { DeltaDetailsCardComponent } from '../delta-details-card/delta-details-card.component';
import { ConfiguraionDetailsCardComponent } from "./../configuraion-details-card/configuraion-details-card.component";
@Component({
  selector: 'app-view-configuration-unit',
  templateUrl: './view-configuration-unit.component.html',
  styleUrls: ['./view-configuration-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewConfigurationUnitComponent implements OnInit, OnDestroy, AfterViewInit {
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
    map(()=> this.dataStoreService.getDeltaList(this.id)),
    tap((result)=> {
      const data = new MatTableDataSource<IDelta>(result);
      data.paginator = this.paginator;
      return data;
    })
  )

  // Display table
  public readonly deltaColDef = ["editor", "message", "time"];
  // Pagination
  @ViewChild(MatPaginator) paginator: any;
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

    this.selectedConfiguration.pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        // this.dataStoreService.getConfiguration(this.id)
      })
    ).subscribe();
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
      this.appInfo.latestChange = this.appInfo.latestChange;
      this.deltaList.forEach(element => {
        element.time = element.timestamp;
      });
      console.log(this.appInfo, this.deltaList);
      this.setSelectedConfiguration(this.appInfo);
    }
  }
  public updateConfiguration() {
    console.log(this.appInfo)
    this.openConfigDialog(this.appInfo);

  }
  // should show the delta
  public showDelta(id: any) {
    const delta = this.dataStoreService.getDelta(id);
    console.log("d:", delta);
    const result = {
      id: this.appInfo.id,
      name: delta.change.meta?.name? delta.change.meta.name: this.appInfo.name,
      ...delta
    }
    this.openDeltaDialog(result);
  }

  public async openDeltaDialog(unit: any) {
    const dialogRef = this.dialog.open(DeltaDetailsCardComponent, {
      width: '80%',
      data: { unit: unit || {}}
    });

  }

  public async openConfigDialog(unit: any) {
    const dialogRef = this.dialog.open(ConfiguraionDetailsCardComponent, {
      width: '80%',
      data: { unit: unit || {}, action: false}
    });
  }
  ngOnDestroy():void{
    this.destroyed$.next(true);
    this.destroyed$.complete();

  }
  ngAfterViewInit() {
    this.currentDelta.pipe(
      tap((result: any)=>{
        result.paginator = this.paginator;
        return result; 
      })
    );
  }


}
