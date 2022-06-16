import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterRequest } from './model/register-request.model';
import { RegisterResponse } from './model/register-response.model';


@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerRequest!: RegisterRequest;
  registerResponse!: RegisterResponse;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { 
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', []]
    });
  }

  ngOnInit(): void {
  }

  onClickRegister() {
    console.log(this.registerForm.value);

    this.registerRequest = new RegisterRequest();
    this.registerRequest.fullName = this.registerForm.value.fullName;
    this.registerRequest.phone = this.registerForm.value.phone;
    this.registerRequest.emailId = this.registerForm.value.emailId;
    this.registerRequest.password = this.registerForm.value.password;

    this.userService.registerService(this.registerRequest).subscribe(registerResponse => {
      this.registerResponse = registerResponse;
      console.log(this.registerResponse);
    });
  }

}
