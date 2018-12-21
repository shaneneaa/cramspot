import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Api } from "../entities/api.class";
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  signUp(user){
    return this.http.post(Api.URL+'signup',user);
  }

  login(user){
    return this.http.post(Api.URL+'login',user);
  }

  isLogged():boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    if (!!localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } 
    return null;
  }

  getDecodedToken(){
    try {
      return jwt_decode(this.getToken());
    } catch (err) {
      return null;
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigateByUrl('/login');
  }
}
