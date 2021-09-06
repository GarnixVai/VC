import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ConfiguraionDetailsCardComponent } from "./containers/configuraion-details-card/configuraion-details-card.component";
import { StringifyService } from 'src/app/services/stringify.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Version Control';
  name = 'Ju Huang Hua';
  


  constructor(private dialog: MatDialog, 
    public stringifyService: StringifyService,) {
  }
  public createApp(){
    const unit = {
      "id": null,
      "name": "",
      "owner": "",
      "latestChange": this.stringifyService.formateDateTime(new Date()),
      "techData": {
          "roles":[
              {"name":"", "permission": [""]},
              {"name":"", "permission": [""]},
              {"name":"", "permission": [""]},
              {"name":"", "permission": [""]},
              {"name":"", "permission": [""]},
              {"name":"", "permission": [""]},
          ]
          },
          "metaData": {
              "configManager": "",
              "name": "",
              "owner": ""
          }
  }
    const dialogRef = this.dialog.open(ConfiguraionDetailsCardComponent, {
      width: '80%',
      data: { unit:  unit, action: true}
    });
  }
}
