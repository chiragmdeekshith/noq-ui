import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterConstant } from '../constant/register.constant';
import { UserService } from '../user.service';
import { RegisterRequest } from './model/register-request.model';
import { RegisterResponse } from './model/register-response.model';


@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerRequest!: RegisterRequest;
  private registerResponse!: RegisterResponse;

  public registerForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  public onClickRegister() {
    console.log(this.registerForm.value);

    this.registerRequest = new RegisterRequest();
    this.registerRequest.fullName = this.registerForm.value.fullName;
    this.registerRequest.phone = this.registerForm.value.phone;
    this.registerRequest.emailId = this.registerForm.value.emailId;
    this.registerRequest.password = this.registerForm.value.password;

    this.userService.register(this.registerRequest).subscribe(registerResponse => {
      this.registerResponse = registerResponse;
      if (RegisterConstant.REGISTRATION_SUCCESSFUL != registerResponse.message) {
        console.log(this.registerResponse.message);
      }
      else {
        console.log("Navigating to login");
        this.router.navigate(['/login']);
      }
    });
  }

}
