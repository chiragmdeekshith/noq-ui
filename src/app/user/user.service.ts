import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './model/login-response.model';
import { LoginRequest } from './model/login-request.model';
import { UserConstant } from './constant/user.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private httpClient: HttpClient) { 
    this.url = "";
  }

  loginService(loginRequest: LoginRequest): Observable<LoginResponse>{
    this.url = UserConstant.SERVER_URL + UserConstant.LOGIN_API;
    return this.httpClient.post<LoginResponse>(this.url, loginRequest);
  }

}
