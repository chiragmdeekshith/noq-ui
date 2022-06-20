import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './model/login-request.model';
import { LoginResponse } from './model/login-response.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginConstant } from '../constant/login.constant';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginRequest!: LoginRequest;
  private loginResponse!: LoginResponse;

  public loginForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

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

    this.userService.login(this.loginRequest).subscribe(loginResponse => {
      this.loginResponse = loginResponse;
      if (LoginConstant.LOGIN_SUCCESSFUL != this.loginResponse.message) {
        console.log(this.loginResponse.message);
      }
      else {
        localStorage.setItem(AppConstant.LOCAL_STORAGE_USER_EMAIL_ID, this.loginResponse.emailId);
        console.log("Navigating to cart");
        this.router.navigate(['/cart']);
      }
    });
  }

  public onClickSignUp() {
    console.log("Navigating to register");
    this.router.navigate(['/register']);
  }
}
