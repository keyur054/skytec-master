import { Injectable } from "@angular/core";
import {
  LocalStorageService as StorageService,
  SessionStorageService
} from "ngx-webstorage";
import { LocalStorageEnum } from "./ls-enum";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor(private storage: SessionStorageService) {}

  /**
   * To set local storage value
   * @param key
   * @param value
   */
  set(key: LocalStorageEnum, value: any) {
    this.storage.store(key, value);
  }
  /**
   * To get localstorage value
   * @param key
   */
  get(key: LocalStorageEnum): any {
    return this.storage.retrieve(key);
  }

  /**
   * To remove localstorage by key
   * @param key
   */
  remove(key: string) {
    this.storage.clear(key);
  }

  /**
   * To remove all localstorage values
   * @param key
   */
  removeAll() {
    this.storage.clear();
  }

  /**
   * To get JWT token from localstorage
   */
  get token() {
    return this.get(LocalStorageEnum.jwttoken);
  }
}
