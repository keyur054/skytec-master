import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/auth/company.service';
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.scss']
})
export class CompanyManageComponent implements OnInit {
  companyId: String;
  contactId: String;
  addressId: String;

  companydata: any = {
    customer_supplier: [],
    active: true,
    isRename: true
  };

  contactdata: any = {
    c_id: this.companyId,
    active: true
  };

  addressdata: any = {
    c_id: this.companyId,
    active: true
  };

  qmsList: any[];
  paymenttermsList: any[];
  contactsList: any[];
  addressList: any[];
  sexList: any[];

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
    //private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get("id");
    console.log(this.companyId);
    if (this.companyId != null) {
      this.companydata.ObjectId = this.companyId;
      this.getCompanyDetail();
      this.getContactsList();
      this.getaddressList();
      this.companydata.isRename = false;
      //this.companydata = false;
    }

    this.getQmsList();
    this.getpaymenttermsList();
    this.getSexList();
    console.log(this.companydata)
  }

  getQmsList() {
    this.companyService.qmsList().subscribe(data => {
      if (data.success) {
        this.qmsList = data.qms;
      }
    });
  }

  getCompanyDetail() {
    this.companyService.companyDetail(this.companyId).subscribe(data => {
      if (data.success) {
        this.companydata = data.company;
        console.log("companydata", this.companydata);
      }
    });
  }

  getpaymenttermsList() {
    this.companyService.paymenttermsList().subscribe(data => {
      if (data.success) {
        this.paymenttermsList = data.payment_terms;
        console.log("payment term list", this.paymenttermsList);
      }
    });
  }

  getContactsList() {
    this.companyService.contactsList(this.companyId).subscribe(data => {
      if (data.success) {
        this.contactsList = data.contacts;
        console.log("contact List: ", this.contactsList);
      }
    });
  }

  getaddressList() {
    this.companyService.addressList(this.companyId).subscribe(data => {
      if (data.success) {
        this.addressList = data.address;
        console.log("address list", this.addressList);
      }
    });
  }

  getSexList() {
    this.companyService.sexList().subscribe(data => {
      if (data.success) {
        this.sexList = data.sex;
        console.log("sex List: ", this.sexList);
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

  onContactSexChange(event, type, list) {
    list = type;
    console.log(type);
  }

  saveCustomerSupplier() {
    console.log("companydata", this.companydata);
    if (!this.companydata.customer_supplier || this.companydata.customer_supplier.length == 0) {
      this.toastr.error("Please select atleast one type of company", "Error");
      return;
    }
    var apiCall = null;
    if (!this.companyId) {
      apiCall = this.companyService.createcustomersupplier(this.companydata);

    } else {
      // if (this.companydata.canChangePassword) {
      //   this.userdata.newpassword = this.userdata.password;
      // }
      apiCall = this.companyService.updatecustomersupplier(this.companyId, this.companydata);
    }
    if (apiCall) {
      apiCall.subscribe(resp => {
        if (resp.success) {
          if (this.companyId)
            this.toastr.success("Customer / Supplier Updated successfully", "Success");
          else {
            this.toastr.success("Customer / Supplier saved successfully", "Success");
            this.router.navigate(["/company/update/" + resp.id]);
          }

        } else {
          this.toastr.error(resp.message, "Error");
        }
      });
    }
  }

  saveContact(form: NgForm) {

    if (this.companyId) {

      var apiCall = null;

      if (!this.contactId) {
        this.contactdata.c_id = this.companyId
        apiCall = this.companyService.createcontact(this.contactdata);
      } else {
        console.log(this.contactdata)
        apiCall = this.companyService.updatecontact(this.contactId, this.contactdata);
      }
      if (apiCall) {
        apiCall.subscribe(resp => {
          if (resp.success) {
            this.toastr.success("Customer / Supplier saved successfully", "Success");
            this.getContactsList();
            form.resetForm();
            this.modalService.dismissAll();
            //this.router.navigate(["/company"]);
            //this.router.navigate(["/company/update/" + this.companyId]);
          } else {
            this.toastr.error(resp.message, "Error");
          }
        });
      }
    }
    else
      this.toastr.error("Customer or supplier not selected", "Error");
  }

  saveAddress(form: NgForm) {
    console.log("addressdata", this.addressdata);
    if (this.companyId) {

      var apiCall = null;
      if (!this.addressId) {
        this.addressdata.c_id = this.companyId
        apiCall = this.companyService.createaddress(this.addressdata);
      } else {
        apiCall = this.companyService.updateaddress(this.addressId, this.addressdata);
      }
      if (apiCall) {
        apiCall.subscribe(resp => {
          if (resp.success) {
            this.toastr.success("Customer / Supplier saved successfully", "Success");
            this.getaddressList();
            form.resetForm();
            this.modalService.dismissAll();
            //this.router.navigate(["/company"]);
            //this.router.navigate(["/company/update/" + this.companyId]);
          } else {
            this.toastr.error(resp.message, "Error");
          }
        });
      }
    }
    else
      this.toastr.error("Customer or Supplier not selected", "Error");
  }

  getSingleAddress() {
    console.log(this.addressId)
    this.companyService.addressDetail(this.addressId).subscribe(data => {
      if (data.success) {
        this.addressdata = data.address;
        console.log("addressdata", this.addressdata);
      }
    });
  }

  getSingleContact() {
    console.log(this.contactId)
    this.companyService.contactDetail(this.contactId).subscribe(data => {
      if (data.success) {
        this.contactdata = data.contact;
        console.log("contactdata", this.contactdata);
      }
    });
  }

  deleteAddress() {
    console.log(this.addressId);
    this.companyService.deleteAddress(this.addressId).subscribe(data => {
      if (data.success) {
        this.toastr.success(data.message, "Success");
        this.getaddressList();
      }
      else {
        this.toastr.error(data.message, "Error");
      }
    });

  }

  deleteContact() {
    
    this.companyService.deleteContact(this.contactId).subscribe(data => {
      if (data.success) {
        this.toastr.success(data.message, "Success");
        this.getContactsList();
      }
      else {
        this.toastr.error(data.message, "Error");
      }
    });
  }

  openModal(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}

