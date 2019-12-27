import { Injectable } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private apiService: ApiService) {}
  login(param: any): Observable<any> {
    return this.apiService.post("auth/web/login", param);
  }
  userDetail(id: any): Observable<any> {
    return this.apiService.get("web/users/" + id);
  }
  passwordUpdate(id: String, param: any): Observable<any> {
    return this.apiService.post("/web/users/password/" + id, param);
  }

  userList(): Observable<any> {
    return this.apiService.get("web/users");
  }
  roleList(): Observable<any> {
    return this.apiService.get("web/roles");
  }
  seperateRoles(roles) {
    var rolesByType = {
      adminRoles: [],
      internalRoles: [],
      doaRoles: [],
      poaRoles: []
    };
    roles.forEach(role => {
      if (role.role_type_ids) {
        if (role.role_type_ids.indexOf("admin") !== -1) {
          rolesByType.adminRoles.push(role);
        }
        if (role.role_type_ids.indexOf("internal") !== -1) {
          rolesByType.internalRoles.push(role);
        }
        if (role.role_type_ids.indexOf("doa") !== -1) {
          rolesByType.doaRoles.push(role);
        }
        if (role.role_type_ids.indexOf("poa") !== -1) {
          rolesByType.poaRoles.push(role);
        }
      }
    });
    return rolesByType;
  }

  createUser(param: any) {
    return this.apiService.post("/web/register", param);
  }

  updateUser(id: String, param: any) {
    return this.apiService.post("/web/users/" + id, param);
  }
}
