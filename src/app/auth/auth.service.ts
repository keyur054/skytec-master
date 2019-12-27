import { Injectable } from "@angular/core";
import { JwtService } from "../services/jwt.service";
import { LocalStorageService } from "../services/local-storage.service";
import { LocalStorageEnum } from "../services/ls-enum";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private localStorageService: LocalStorageService
  ) {}

  isLoggedIn() {
    return this.jwtService.getToken();
  }
  logout() {
    this.jwtService.destroyToken();
    this.destroyUser();
  }
  getUser(): any {
    return this.localStorageService.get(LocalStorageEnum.user);
  }

  setUser(user: any) {
    this.localStorageService.set(LocalStorageEnum.user, user);
  }
  destroyUser() {
    this.localStorageService.remove(LocalStorageEnum.user);
  }
}
