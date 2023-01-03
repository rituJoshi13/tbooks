import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Token } from '../models/auth';
import { environment } from 'src/environments/environment';
import {HttpClient,HttpHeaders } from "@angular/common/http";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor(private http: HttpClient) { }
  
  signOut(): void {
    window.localStorage.clear();
 /*   var token = this.getToken();
   if(this.delteToken(token)){
    window.localStorage.clear();
   }*/
  }
async deleteToken(token){
  var generateDeleteToken= environment.API_URL+"/users/logout";
    var promise=await new Promise<boolean>((resolve, reject) => {
      this.http.delete<Token>(generateDeleteToken,{body:token}).subscribe({
        next: (res: any) => {
        
          resolve(true);
        },
        error: (err: any) => {
          resolve(false);
        },
      });
    });
    return promise;
  }
  public saveToken(token: Token): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }
 
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(token: Token): void {
   
  }
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
