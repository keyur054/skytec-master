import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

import { UiSwitchModule } from "ngx-ui-switch";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DataTableModule } from "angular-6-datatable";
import { Headers, HttpModule, Response, URLSearchParams } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicLayoutComponent } from "./theme/public-layout/public-layout.component";
import { PrivateLayoutComponent } from "./theme/private-layout/private-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LocalStorageService } from "./services/local-storage.service";
import { NgxWebstorageModule } from "ngx-webstorage";
import { UserProfileComponent } from "./auth/user-profile/user-profile.component";
import { ValidateEqualDirective } from "./auth/validate-equal.directive";
import { UserListComponent } from "./auth/user-list/user-list.component";
import { UserManageComponent } from "./auth/user-manage/user-manage.component";
import { CompanyListComponent } from './company/company-list/company-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    ValidateEqualDirective,
    UserListComponent,
    UserManageComponent,
    CompanyListComponent
  ],
  imports: [
    NgbModule,
    NgxWebstorageModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    DataTableModule,
    UiSwitchModule.forRoot({
      color: "rgb(0, 189, 99)",
      switchColor: "#80FFA2",
      defaultBgColor: "#476EFF",
      defaultBoColor: "green",
      checkedLabel: "Yes",
      uncheckedLabel: "No"
    })
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
