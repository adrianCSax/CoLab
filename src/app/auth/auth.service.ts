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

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
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
      this.http.post("http://localhost:3000/api/user/signup", authData)
        .subscribe(response => {
            console.log(response);
        })
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token != "") {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration * 1000);
          this.authStatus = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveTokenInLocalStorage(this.token, this.getExpirationDate(response.expiresIn));
          this.router.navigate(["/"]);
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

  private saveTokenInLocalStorage(token: string, expiresInData: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresInData.toISOString());
  }

  private clearTokenInLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  private getExpirationDate(expiresIn: number): Date {
    const date = new Date();
    return new Date(date.getTime() + (expiresIn * 1000));
  }

  private getAuthData() : {token: string, expiresInData: Date} | undefined {
    const token = localStorage.getItem('token');
    const expiresInData = localStorage.getItem('expiresIn');
    let resolved = undefined;
    
    if (expiresInData !== null && token !== null && token !== '') {
      resolved =  {
        token: token,
        expiresInData: new Date(expiresInData)
      }
    }

    return resolved;
  }

}
