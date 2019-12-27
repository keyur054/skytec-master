import { Component, OnInit } from "@angular/core";
import {
  Headers,
  Http,
  Response,
  URLSearchParams,
  RequestOptions
} from "@angular/http";
import { Observable } from "rxjs";
import { UserService } from "../user.service";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  userList: any = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserList();
  }
  getUserList() {
    this.userService.userList().subscribe(data => {
      if (data.success) {
        data.users.forEach(element => {
          element.roles = this.userService.seperateRoles(element.role_ids);
          element.adminRoles = element.roles.adminRoles
            .map(r => r.abbr)
            .join(", ");
          element.internalRoles = element.roles.internalRoles
            .map(r => r.abbr)
            .join(", ");
          element.doaRoles = element.roles.doaRoles.map(r => r.abbr).join(", ");
          element.poaRoles = element.roles.poaRoles.map(r => r.abbr).join(", ");
        });
        this.userList = data.users;
        console.log("this.userList", this.userList);
      }
    });
  }
}
