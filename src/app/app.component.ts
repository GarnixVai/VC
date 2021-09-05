import { IConfiguration, IDelta } from './interfaces/data.interface';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DataService } from "./services/data.service";
import { DataStoreService } from "./services/data-store.service";
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { takeUntil, tap, map } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Version Control';
  name = 'Ju Huang Hua';
  


  constructor() {
  }

}
