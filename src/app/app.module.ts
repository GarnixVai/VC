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
@NgModule({
  declarations: [
    AppComponent,
    ViewBlockRawUnitComponent
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
  entryComponents: [ViewBlockRawUnitComponent],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
