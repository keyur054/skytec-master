import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/auth/company.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent implements OnInit {

  companyList: any = [];
  companyId = 0;

  constructor(private companyService: CompanyService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.companyList().subscribe(data => {
      if (data.success) {
        data.company.forEach(element => {
          console.log(element)
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
    });
  }

  deleteCompany() {
    console.log(this.companyId);
  }

  open(content) {
    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.companyId = 10;
    });
  }
}
