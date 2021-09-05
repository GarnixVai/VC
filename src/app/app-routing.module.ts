
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ViewConfigurationUnitComponent } from './containers/view-configuration-unit/view-configuration-unit.component';
import { ConfiguraionListComponent } from './containers/configuraion-list/configuraion-list.component';
const routes: Routes = [
 
  {path: "configure/:id", component: ViewConfigurationUnitComponent},
  {path: "home", component: ConfiguraionListComponent},
  {path: "",  redirectTo:"home",  pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
