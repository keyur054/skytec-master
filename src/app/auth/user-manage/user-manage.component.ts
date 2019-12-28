import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"]
})
export class UserManageComponent implements OnInit {
  userId: String;
  userdata: any = {
    active: true,
    role_ids: [],
    canChangePassword: true
  };
  extraParams: any = {
    adminRoles: [],
    internalRoles: [],
    doaRoles: [],
    poaRoles: []
  };
  allRoels: any = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");

    this.getRoleList();
  }
  loadUserDetails(userId) {
    if (userId) {
      this.userService.userDetail(userId).subscribe(resp => {
        if (resp.success) {
          var data = resp.user;
          if (resp.user.role_ids) {
            data.role_ids = resp.user.role_ids.map(o => {
              return o._id;
            });
          } else {
            data.role_ids = [];
          }
          data.canChangePassword = false;

          this.userdata = data;
          this.userdata.password = "12345678";
          console.log("resp", data);
        }
      });
    }
  }
  getRoleList() {
    this.userService.roleList().subscribe(resp => {
      if (resp.success) {
        this.allRoels = this.userService.seperateRoles(resp.data);
        console.log("this.allRoels", this.allRoels);
        this.loadUserDetails(this.userId);
      }
    });
  }
  changePassword() {
    if (this.userdata.canChangePassword) {
      this.userdata.password = "12345678";
    } else {
      this.userdata.password = "";
    }
    this.userdata.canChangePassword = !this.userdata.canChangePassword;
  }

  onRoleChange(event, role, list) {
    var index = list.indexOf(role._id);
    if (index === -1) {
      list.push(role._id);
    } else {
      list.splice(index, 1);
    }
  }

  saveUser() {
    console.log("userdata", this.userdata);
    if (!this.userdata.role_ids || this.userdata.role_ids.length == 0) {
      this.toastr.error("Please select atleast one permission", "Error");
      return;
    }
    var apiCall = null;
    if (!this.userId) {
      console.log(this.userdata)
      apiCall = this.userService.createUser(this.userdata);
      this.toastr.success("User saved successfully", "Success");
    } else {
      if (this.userdata.canChangePassword) {
        this.userdata.newpassword = this.userdata.password;
      }
      apiCall = this.userService.updateUser(this.userId, this.userdata);
    }
    if (apiCall) {
      apiCall.subscribe(resp => {
        if (resp.success) {
          this.toastr.success("User saved successfully", "Success");
          this.router.navigate(["/users"]);
        } else {
          this.toastr.error(resp.message, "Error");
        }
      });
    }
  }
}
