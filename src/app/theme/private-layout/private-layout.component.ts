import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-private-layout",
  templateUrl: "./private-layout.component.html",
  styleUrls: ["./private-layout.component.scss"]
})
export class PrivateLayoutComponent implements OnInit {
  loggedInUser: any;
  year: any;
  openDDL: any;
  constructor(private authService: AuthService, private router: Router) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getUser();
  }
  changeStyle($event, type) {
    this.openDDL = type;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
