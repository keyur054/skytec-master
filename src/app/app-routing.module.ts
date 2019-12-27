import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicLayoutComponent } from "./theme/public-layout/public-layout.component";
import { PrivateLayoutComponent } from "./theme/private-layout/private-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";
import { UserProfileComponent } from "./auth/user-profile/user-profile.component";
import { UserListComponent } from "./auth/user-list/user-list.component";
import { UserManageComponent } from "./auth/user-manage/user-manage.component";
import { CompanyListComponent } from "./company/company-list/company-list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: PublicLayoutComponent,
    children: [{ path: "login", component: LoginComponent }],
    canActivate: [AuthGuard],
    data: { isPublic: true }
  },
  {
    path: "",
    component: PrivateLayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: UserProfileComponent },
      { path: "users", component: UserListComponent },
      { path: "users/create", component: UserManageComponent },
      { path: "users/update/:id", component: UserManageComponent },
      { path: "company", component: CompanyListComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
