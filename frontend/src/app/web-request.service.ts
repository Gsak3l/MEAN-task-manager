import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  // Constructor
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  // This is Used to Send Get Requests to the Database
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  };

  // This is Used to Send Get Requests to the Database
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  };

  // This is Used to Send Get Requests to the Database
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  };

  // This is Used to Send Get Requests to the Database
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  };

  // This is Used to Authenticate the User when trying to Login
  login(email: string, password: string) {
    return this.http.post(`$(this.ROOT_URL)/users/login`, {
      email,
      password
    }, { observe: 'response' });
  }

}
