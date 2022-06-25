import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/noq-common/shared.service';
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
  public toastMessage!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService) {
    this.toastMessage = "";
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  public errorsPresent(): boolean {
    return (
      this.registerForm.get('fullName')?.errors != null ||
      this.registerForm.get('phone')?.errors != null ||
      this.registerForm.get('emailId')?.errors != null ||
      this.registerForm.get('password')?.errors != null ||
      this.registerForm.get('confirmPassword')?.errors != null
    );
  }

  public onClickRegister() {
    console.log(this.registerForm.value)

    if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      this.toastMessage = "Passwords do not match";
    }

    else {

      this.registerRequest = new RegisterRequest();
      this.registerRequest.fullName = this.registerForm.value.fullName;
      this.registerRequest.phone = this.registerForm.value.phone;
      this.registerRequest.emailId = this.registerForm.value.emailId;
      this.registerRequest.password = this.registerForm.value.password;

      this.userService.register(this.registerRequest).subscribe(registerResponse => {
        this.registerResponse = registerResponse;
        if (RegisterConstant.REGISTRATION_SUCCESSFUL != registerResponse.message) {
          console.log(this.registerResponse.message);
          switch (registerResponse.message) {
            case RegisterConstant.EMAIL_ID_ALREADY_EXISTS: this.toastMessage = "Email ID is already registered"; break;
            case RegisterConstant.REGISTRATION_FAILED: this.toastMessage = "Registration Failed!"; break;
          }
        }
        else {
          console.log("Navigating to home");
          this.sharedService.onClickLogin$.next(true);
          this.router.navigate(['/home']);
        }
      });
    }
  }

}
