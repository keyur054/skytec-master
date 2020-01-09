import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class MasterdataService {
  constructor(private apiService: ApiService) { }

  aircraftList(): Observable<any> {
    return this.apiService.get("web/aircraft");
  }

//   companyDetail(id: any): Observable<any> {
//     return this.apiService.get("web/company/edit/" + id);
//   }

//   deleteCompany(id: any) {
//     return this.apiService.post("web/company/delete/" + id);
//   }

 





}
