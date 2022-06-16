import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login/model/login-response.model';
import { LoginRequest } from './login/model/login-request.model';
import { UserConstant } from './constant/user.constant';
import { Observable } from 'rxjs';
import { RegisterRequest } from './register/model/register-request.model';
import { RegisterResponse } from './register/model/register-response.model';

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

  registerService(registerRequest: RegisterRequest){
    this.url = UserConstant.SERVER_URL + UserConstant.REGISTER_API;
    return this.httpClient.post<RegisterResponse>(this.url, registerRequest);
  }

}
