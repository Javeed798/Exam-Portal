import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public loginStatusSubject = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  public generateToken(loginData:any) {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // current user : who is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // login user : set token in local storage
  public loginUser(token:any) {
    localStorage.setItem("token",token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // check if user if logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr==null) {
      return false;
    } else {
      return true;
    }
  }

  //  logout : remove token from localstorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken(){
    return localStorage.getItem("token");
  }


  //  set user details in the localstorage
  public setUser(user:any) {
    localStorage.setItem("user",JSON.stringify(user));
  }

  public userLoggedIn(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }




}
