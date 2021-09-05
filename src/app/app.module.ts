// import { ViewBlockRawUnitModule } from './containers/view-block-raw-unit/view-block-raw-unit.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ViewBlockRawUnitComponent } from './containers/view-block-raw-unit/view-block-raw-unit.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from '@angular/common';
import { ViewConfigurationUnitComponent } from './containers/view-configuration-unit/view-configuration-unit.component';
import { ConfiguraionDetailsCardComponent } from './containers/configuraion-details-card/configuraion-details-card.component';
import { ConfiguraionListComponent } from './containers/configuraion-list/configuraion-list.component';
import { DeltaDetailsCardComponent } from './containers/delta-details-card/delta-details-card.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewBlockRawUnitComponent,
    ViewConfigurationUnitComponent,
    ConfiguraionDetailsCardComponent,
    ConfiguraionListComponent,
    DeltaDetailsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule
  ],
  entryComponents: [
    ViewBlockRawUnitComponent, 
    ConfiguraionDetailsCardComponent,
    DeltaDetailsCardComponent],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
