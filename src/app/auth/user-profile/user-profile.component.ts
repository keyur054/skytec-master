import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  userId: string = null;
  userDetail: any = { _id: null };
  pageTitle: String = "My Profile";
  model: any = {
    oldpassword: null,
    newpassword: "",
    confirmpassword: ""
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUserDetail();
  }
  loadUserDetail() {
    var user = this.authService.getUser();
    this.userService.userDetail(user._id).subscribe(data => {
      if (data.success) {
        this.userDetail = data.user;
      }
    });
  }
  roleNames(roles) {
    var nameLList = [];
    roles.forEach(element => {
      nameLList.push(element.name);
    });
    return nameLList.join(", ");
  }
  openPasswordReset(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.model = {};
          // this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.model = {};
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  resetPassword() {
    this.userService
      .passwordUpdate(this.userDetail._id, this.model)
      .subscribe(data => {
        if (data.success) {
          this.modalService.dismissAll();
          this.toastr.success("Password changed successfully", "Success");
        } else {
          this.toastr.error(data.message, "Error");
        }
      });
  }
}
