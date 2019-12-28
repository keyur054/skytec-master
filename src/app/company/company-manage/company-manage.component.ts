import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/auth/company.service';
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.scss']
})
export class CompanyManageComponent implements OnInit {
  companyId: String;
  companydata: any = {
    customer_supplier: [],
    active: true
  };
  qmsList: any[];
  paymenttermsList: any[];

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get("id");
    this.getQmsList();
    this.getpaymenttermsList();
    console.log(this.companydata)
  }

  getQmsList() {
    this.companyService.qmsList().subscribe(data => {
      if (data.success) {
        this.qmsList = data.qms;
      }
    });
  }

  getpaymenttermsList() {
    this.companyService.paymenttermsList().subscribe(data => {
      if (data.success) {
        this.paymenttermsList = data.payment_terms;
        console.log(this.paymenttermsList);
      }
    });
  }

  onCompanyTypeChange(event, type, list) {
    
    var index = list.indexOf(type);
    if (index === -1) {
      list.push(type);
    } else {
      list.splice(index, 1);
    }
  }

  saveCustomerSupplier() {
    console.log("userdata", this.companydata);
    if (!this.companydata.customer_supplier || this.companydata.customer_supplier.length == 0) {
      this.toastr.error("Please select atleast one type of company", "Error");
      return;
    }
    var apiCall = null;
    if (!this.companyId) {
      console.log(this.companydata)
      apiCall = this.companyService.createcustomersupplier(this.companydata);
      
    } else {
      // if (this.companydata.canChangePassword) {
      //   this.userdata.newpassword = this.userdata.password;
      // }
      apiCall = this.companyService.updateUser(this.companyId, this.companydata);
    }
    if (apiCall) {
      apiCall.subscribe(resp => {
        if (resp.success) {
          this.toastr.success("Customer / Supplier saved successfully", "Success");
          this.router.navigate(["/company"]);
        } else {
          this.toastr.error(resp.message, "Error");
        }
      });
    }
  }

}
