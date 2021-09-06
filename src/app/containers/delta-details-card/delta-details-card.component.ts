import { IDelta, IRole, IMetaData, IConfiguration } from './../../interfaces/data.interface';
import { DataService } from './../../services/data.service';
import { DataStoreService } from 'src/app/services/data-store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, AfterViewInit } from "@angular/core";


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
     }
  }

  close(){
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.arrayOfRoles.paginator = this.paginator;
  }


}
