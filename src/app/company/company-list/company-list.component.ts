import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/auth/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companyList: any = [];

  constructor(private companyService: CompanyService) { }

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

          //if(element.customer_supplier.f)
          //   element.roles = this.companyService.seperateRoles(element.role_ids);
          //   element.adminRoles = element.roles.adminRoles
          //     .map(r => r.abbr)
          //     .join(", ");
          //   element.internalRoles = element.roles.internalRoles
          //     .map(r => r.abbr)
          //     .join(", ");
          //   element.doaRoles = element.roles.doaRoles.map(r => r.abbr).join(", ");
          //   element.poaRoles = element.roles.poaRoles.map(r => r.abbr).join(", ");
        });
        this.companyList = data.company;
        console.log("this.companyList", this.companyList);
      }
    });
  }

}
