import { Injectable } from "@angular/core";
// import { environment } from "environments/environment";
import { environment } from "src/environments/environment";
import {
  Headers,
  Http,
  Response,
  URLSearchParams,
  RequestOptions
} from "@angular/http";
import { Observable } from "rxjs";
import { tap, map, filter, catchError } from "rxjs/operators";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/catch";
// import "rxjs/add/observable/throw";

import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: Http, private jwtService: JwtService) {}

  private setHeaders(): Headers {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    if (this.jwtService.getToken()) {
      headersConfig["x-access-token"] = this.jwtService.getToken();
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error);
  }

  get(
    path: string,
    params: URLSearchParams = new URLSearchParams()
  ): Observable<any> {
    return (
      this.http
        .get(`${environment.apiUrl}${path}`, {
          headers: this.setHeaders(),
          search: params
        })
        // .pipe(catch(this.formatErrors))
        .pipe(
          catchError(err => this.formatErrors),
          map(res => res.json())
        )
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(err => this.formatErrors),
        map((res: Response) => res.json())
      );
    // .catch(this.formatErrors)
    // .map((res: Response) => res);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(err => this.formatErrors),
        map((res: Response) => res.json())
      );
    // .catch(this.formatErrors)
    // .map((res: Response) => res);
  }

  postForm(path: string, body: any): Observable<any> {
    const headersConfig = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    if (this.jwtService.getToken()) {
      headersConfig["x-access-token"] = "Bearer " + this.jwtService.getToken();
    }
    var headers = new Headers(headersConfig);
    let options = new RequestOptions({ headers });

    return this.http
      .post(`${environment.apiUrl}${path}`, body.toString(), options)
      .pipe(
        catchError(err => this.formatErrors),
        map((res: Response) => res.json())
      );
    // .catch(this.formatErrors)
    // .map((res: Response) => res);
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`, {
        headers: this.setHeaders()
      })
      .pipe(
        catchError(err => this.formatErrors),
        map((res: Response) => res.json())
      );
    // .catch(this.formatErrors)
    // .map((res: Response) => res);
  }
}
