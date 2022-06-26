import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './model/login-request.model';
import { LoginResponse } from './model/login-response.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginConstant } from '../constant/login.constant';
import { AppConstant } from 'src/app/app.constant';
import { SharedService } from 'src/app/noq-common/shared.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginRequest!: LoginRequest;
  public loginResponse!: LoginResponse;
  public loginForm!: FormGroup;
  public toastMessage!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.toastMessage = "";
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
        switch (this.loginResponse.message) {
          case LoginConstant.LOGIN_FAILED: this.toastMessage = "Email ID or password is incorrect."; break;
          case LoginConstant.USER_NOT_FOUND: this.toastMessage = "Email ID is not registered."; break;
        }
      }
      else {
        sessionStorage.setItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID, this.loginResponse.emailId);
        console.log("Navigating to home");
        this.sharedService.onClickLogin$.next(true);
        this.router.navigate(['/home']);
      }
    });
  }

  public onClickSignUp() {
    console.log("Navigating to register");
    this.router.navigate(['/register']);
  }
}
