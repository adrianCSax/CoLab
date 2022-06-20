import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth_data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = "";
  private authStatusListener = new Subject<boolean>();
  private authStatus: boolean = false;
  private nodeTimer: any = null;
  private id: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getId() {
    return localStorage.id;
  }
  
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isAuthenticated() {
    return this.authStatus;
  } 

  createUser(tagname: string, email: string, password: string) {
      const authData: AuthData = {
          tagname: tagname,
          email: email,
          password: password
      }
      this.http.post<{msg: string, created: boolean}>("http://localhost:3000/api/user/signup", authData)
        .subscribe((response) => {
          console.log(response);
          if (response.created === true) {
            console.log("Está dentro de result");
            this.router.navigate(["/"]);
          }
        });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{token: string, expiresIn: number, id: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        this.token = response.token;
        this.id = response.id;
        if (this.token !== "") {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration * 1000);
          this.authStatus = true;
          this.authStatusListener.next(true);
          this.saveTokenInLocalStorage(this.token, this.getExpirationDate(response.expiresIn), this.id);
          this.router.navigate(["/menu"]);
        }
      });
  }

  checkIfStillLogin() {
    const loginInfo = this.getAuthData();
    if (loginInfo !== undefined) {
      const now = new Date();
      const expiresIn = loginInfo?.expiresInData.getTime() - now.getTime();
      this.initAutoAuth(loginInfo.token, expiresIn);
    }
  }
  
  logout() {
    this.token = '';
    this.authStatus = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearTokenInLocalStorage();
    clearTimeout(this.nodeTimer);
  }

  private initAutoAuth(token: string, expiresIn: number) {
    if(expiresIn > 0) {
      this.token = token;
      this.authStatus = true;
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(miliseconds: number) {
    this.nodeTimer = setTimeout(() => {
      this.logout();
    }, miliseconds);
  }

  private saveTokenInLocalStorage(token: string, expiresInData: Date, id: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresInData.toISOString());
    localStorage.setItem('id', id);
  }

  private clearTokenInLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('id');
  }

  private getExpirationDate(expiresIn: number): Date {
    const date = new Date();
    return new Date(date.getTime() + (expiresIn * 1000));
  }

  private getAuthData() : {token: string, expiresInData: Date, id: string} | undefined {
    const token = localStorage.getItem('token');
    const expiresInData = localStorage.getItem('expiresIn');
    const id = localStorage.getItem('id');
    let resolved = undefined;
    
    if (expiresInData !== null && token !== null && token !== '' && id !== null && id !== '') {
      resolved =  {
        token: token,
        expiresInData: new Date(expiresInData),
        id: id
      }
    }

    return resolved;
  }

}
