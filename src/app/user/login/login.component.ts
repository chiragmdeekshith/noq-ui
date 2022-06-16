import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './model/login-request.model';
import { LoginResponse } from './model/login-response.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest!: LoginRequest;
  loginResponse!: LoginResponse;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }  

  ngOnInit(): void {
  }

  onClickLogin() {
    this.loginRequest = new LoginRequest();
    this.loginRequest.emailId = this.loginForm.value.emailId;
    this.loginRequest.password = this.loginForm.value.password;

    this.userService.loginService(this.loginRequest).subscribe(loginResponse =>{
      this.loginResponse = loginResponse;
      console.log(this.loginResponse);
    });
  }
}
