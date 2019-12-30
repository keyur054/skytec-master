import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class CompanyService {
  constructor(private apiService: ApiService) { }

  companyList(): Observable<any> {
    return this.apiService.get("web/company");
  }

  companyDetail(id: any): Observable<any> {
    return this.apiService.get("web/company/edit/" + id);
  }

  deleteCompany(id: any) {
    return this.apiService.post("web/company/delete/" + id);
  }

  searchCompanyList(param: any) {
    return this.apiService.post("web/company/search", param);
  }

  createcustomersupplier(param: any) {
    return this.apiService.post("/web/company/addnew", param);
  }

  updatecustomersupplier(id: any, param: any) {
    return this.apiService.post("/web/company/" + id, param);
  }

  qmsList(): Observable<any> {
    return this.apiService.get("web/qms");
  }

  paymenttermsList(): Observable<any> {
    return this.apiService.get("web/paymentterm");
  }

  contactsList(id: any): Observable<any> {
    return this.apiService.get("web/contacts/" + id);
  }

  createcontact(param: any) {
    return this.apiService.post("/web/contact/addnew", param);
  }

  updatecontact(id: any, param: any) {
    return this.apiService.post("/web/contact/" + id, param);
  }

  contactDetail(id: any): Observable<any> {
    return this.apiService.get("web/contact/edit/" + id);
  }

  deleteContact(id: any) {
    return this.apiService.post("web/contact/delete/" + id);
  }

  createaddress(param: any) {
    return this.apiService.post("/web/address/addnew", param);
  }

  addressDetail(id: any): Observable<any> {
    return this.apiService.get("web/address/edit/" + id);
  }

  updateaddress(id: any, param: any) {
    return this.apiService.post("/web/address/" + id, param);
  }

  addressList(id: any): Observable<any> {
    return this.apiService.get("web/address/" + id);
  }

  deleteAddress(id: any) {
    return this.apiService.post("web/address/delete/" + id);
  }


  sexList(): Observable<any> {
    return this.apiService.get("web/sex");
  }




}
