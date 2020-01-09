import { Component, OnInit } from '@angular/core';
import { MasterdataService } from 'src/app/auth/masterdata.service';
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent implements OnInit {
  
  aircraftList: any = [];
  aircraftId = 0;
  
  aircraftdata: any = {
    active: false
  };
  constructor(
    private masterdataService: MasterdataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAircraftList();
  }

  getAircraftList() {
    this.masterdataService.aircraftList().subscribe(data => {
      if (data.success) {
        this.filterAircraftList(data);
      }
    });
  }
  filterAircraftList(data) {
    // data.company.forEach(element => {
    //   element.customer_supplier.some(function (item) {
    //     if (item == 1)
    //       element.customer_internalC = "C" + element.customer_supplier_no.substring(0, 3) + "_" + element.company_short_name

    //     if (item == 2)
    //       element.customer_internalS = "S" + element.customer_supplier_no.substring(0, 3) + "_" + element.company_short_name
    //   });
    // });
    this.aircraftList = data.aircraft;
    console.log("this.companyList", this.aircraftList);
  }
  openModal(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}

