import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { LocalStorageEnum } from "./ls-enum";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  constructor(private localStorageService: LocalStorageService) {}
  getToken(): String {
    return this.localStorageService.get(LocalStorageEnum.jwttoken);
  }

  saveToken(token: String) {
    this.localStorageService.set(LocalStorageEnum.jwttoken, token);
  }

  destroyToken() {
    this.localStorageService.remove(LocalStorageEnum.jwttoken);
  }
}
