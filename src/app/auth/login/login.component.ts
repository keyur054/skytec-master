import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService } from "../../services/jwt.service";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  errorMessage: string = "";
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService,
    private userService: UserService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/dashboard"]);
    }
  }

  onLogin() {
    this.errorMessage = "";

    this.userService.login(this.model).subscribe(data => {
      if (data.success) {
        this.jwtService.saveToken(data.token);
        this.authService.setUser(data.user);
        this.zone.run(() => {
          this.router.navigate(["/dashboard"]);
        });
      } else {
        this.errorMessage = "Username or password is incorrect.";
      }
    });
  }
}
