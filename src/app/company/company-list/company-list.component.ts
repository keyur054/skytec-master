import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/auth/company.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent implements OnInit {

  companyList: any = [];
  companyId = 0;

  searchdata: any = {};

  constructor(private companyService: CompanyService,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.companyList().subscribe(data => {
      if (data.success) {
        this.filterCompanyList(data);
      }
    });
  }

  filterCompanyList(data) {
    data.company.forEach(element => {
      element.customer_supplier.some(function (item) {
        if (item == 1)
          element.customer_internalC = "C" + element.customer_supplier_no.substring(0, 3) + "_" + element.company_short_name

        if (item == 2)
          element.customer_internalS = "S" + element.customer_supplier_no.substring(0, 3) + "_" + element.company_short_name
      });
    });
    this.companyList = data.company;
    console.log("this.companyList", this.companyList);
  }

  deleteCompany() {
    console.log(this.companyId);
    this.companyService.deleteCompany(this.companyId).subscribe(data => {
      if (data.success) {
        this.toastr.success(data.message, "Success");
        this.getCompanyList();
      }
      else {
        this.toastr.error(data.message, "Error");
      }
    });
  }

  searchCustomer() {
    console.log(this.searchdata)
    this.companyService.searchCompanyList(this.searchdata).subscribe(data => {
      if (data.success) {
        this.filterCompanyList(data)
        //this.getCompanyList();
        this.toastr.success("search complete", "Success");
      }
      else {
        this.toastr.error("Error", "Error");
      }
    });
    //this.companyService.searchCompanyList()
    console.log('search');
  }
  openModal(content) {
    this.modalService.open(content);
  }
}
