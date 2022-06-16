import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login/model/login-response.model';
import { LoginRequest } from './login/model/login-request.model';
import { RegisterRequest } from './register/model/register-request.model';
import { RegisterResponse } from './register/model/register-response.model';
import { AppConstant } from '../app.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url!: string;

  constructor(private httpClient: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.LOGIN_API;
    return this.httpClient.post<LoginResponse>(this.url, loginRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.REGISTER_API;
    return this.httpClient.post<RegisterResponse>(this.url, registerRequest);
  }

}
