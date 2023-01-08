import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {UserInfoComponent} from './user-info/user-info.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {AppGuard} from "../gaurd/app-guard.service";
import {PanelComponent} from "./panel/panel.component";
import {BaseInformationHeaderComponent} from "./baseInformationHeader/baseInformationHeader.component";

const routes: Routes = [
  {
    path: '',
    canActivate:[AppGuard],
    component: DashboardComponent,
    children: [
      {
        path:'userInfo',
        component: BaseInformationHeaderComponent
      },
      {
        path:'panel',
        component: PanelComponent
      },
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserInfoComponent,
    SideNavComponent,
    PanelComponent,
    BaseInformationHeaderComponent

  ],
  providers: [],
  exports: [
    DashboardComponent,
    SideNavComponent
  ]
})
export class DashboardModule {
}
