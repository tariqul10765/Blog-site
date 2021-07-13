import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  formData = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // tslint:disable-next-line:typedef
  get f() { return this.registerForm.controls; }
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.loginData(this.registerForm.value)
      .subscribe(res => {
        console.log(res.data);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userName);
        this.router.navigate(['/home']);
      });
  }

}
