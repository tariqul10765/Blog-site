import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserRegister} from '../interfaces/user-register';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  // emailError;
  //
  // formData: UserRegister = {
  //   name: '',
  //   userName: '',
  //   email: '',
  //   password: ''
  // };
  errorMessage = {};
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // tslint:disable-next-line:typedef
  get f() { return this.registerForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.registerData(this.registerForm.value)
      .subscribe(res => {
        // console.log(res.token);
        alert(res.message);
        if (res.token) { this.registerForm.reset(); }
        // @ts-ignore
        // localStorage.setItem('token', res);
      });
    // console.log(this.errorMessage[0].message);
    }
}
