import { BlockService } from './../../services/block.service';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { IBlockRawUnit, Itx } from './../../interfaces/block-chain';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { StringifyService } from 'src/app/services/stringify.service.ts.service';
export interface IViewUnitDialogData {
  unit: IBlockRawUnit;
}
@Component({
  selector: 'app-view-block-raw-unit',
  templateUrl: './view-block-raw-unit.component.html',
  styleUrls: ['./view-block-raw-unit.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})


export class ViewBlockRawUnitComponent implements OnInit, AfterViewInit {

  public arrayOfKeys: string[] = [];
  public arrayOfJsons: any;
  public arrayOfTransactions: any;
  @ViewChild(MatPaginator) paginator: any;

  /** Table for dispalying transactions */
  displayedFeaturesTx: string[] = ['hash', 'fee', 'weight'];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('details');
  expandedElement: any;
  isTableExpanded = false;

  /** Display transaction details */
  displayedDetails: any;

  constructor(public dialogRef: MatDialogRef<ViewBlockRawUnitComponent>,
    private dataService: BlockService,
    public stringifyService: StringifyService, 
    @Inject(MAT_DIALOG_DATA) public data: IViewUnitDialogData) {
  }
  public close() {
    this.dialogRef.close();
  }

  public async expend(row: any) {
    this.isTableExpanded = !this.isTableExpanded;
    let detailedUnit;
    detailedUnit = await this.dataService.loadTransaction(row.hash);
    row.isExpanded = this.isTableExpanded;
    
  }




  ngOnInit(): void {
    this.arrayOfJsons = this.data.unit;
    this.arrayOfTransactions = new MatTableDataSource<Itx>(this.arrayOfJsons.tx.map((e: any) => {
      e.isExpended = false;
      return e;
}
    ));
    delete this.arrayOfJsons.tx;
    this.arrayOfKeys = Object.keys(this.data.unit);
  }

  ngAfterViewInit() {
    this.arrayOfTransactions.paginator = this.paginator;
  }

}
