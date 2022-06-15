import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login-request.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: LoginRequest;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });;
    this.loginRequest = new LoginRequest();
  }  

  ngOnInit(): void {
  }

  onClickLogin() {
    console.log(this.loginForm.value);
    this.loginRequest.emailId = this.loginForm.value.emailId;
    this.loginRequest.password = this.loginForm.value.password;

    this.userService.loginService(this.loginRequest).subscribe(loginResponse =>{
      console.log(loginResponse);
    });
  }

}
