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

  private loginRequest!: LoginRequest;
  private loginResponse!: LoginResponse;

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public onClickLogin() {
    this.loginRequest = new LoginRequest();
    this.loginRequest.emailId = this.loginForm.value.emailId;
    this.loginRequest.password = this.loginForm.value.password;

    this.userService.login(this.loginRequest).subscribe(loginResponse =>{
      this.loginResponse = loginResponse;
      console.log(this.loginResponse);
    });
  }
}
