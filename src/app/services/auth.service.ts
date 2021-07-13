import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRegister} from '../interfaces/user-register';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:3000/auth/registration';
  private loginUrl = 'http://localhost:3000/auth/login';
  private authorizedUserUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  registerData(user){
    return this.http.post<{ message: string, token: string }>(this.registerUrl, user);
  }

  // tslint:disable-next-line:typedef
  loginData(user){
    return this.http.post<any>(this.loginUrl, user);
  }

  // tslint:disable-next-line:typedef
  loggedIn(){
    return !!localStorage.getItem('token'); // token jodi thake tahole true return korbe, na thakle false return korbe
  }

  // tslint:disable-next-line:typedef
  loggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  getToken(){
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line:typedef
  getUserName(){
    return localStorage.getItem('userName');
  }

  // tslint:disable-next-line:typedef
  authorizedUserData(): any {
    return this.http.get(this.authorizedUserUrl);
  }

}
