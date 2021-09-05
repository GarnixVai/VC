import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../../material.module";
import { ConfiguraionDetailsCardComponent } from "./configuraion-details-card.component";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
    declarations: [ConfiguraionDetailsCardComponent],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        MatRadioModule
    ],
    exports: [ConfiguraionDetailsCardComponent]
})
export class RentalUnitDetailsModule {
}
