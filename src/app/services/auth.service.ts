import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from "@angular/common/http";
import { Token } from '../models/auth';
import { Login, Register } from '../models/auth';
import { TokenStorageService } from './token-storage.service';
import { CompanyProfileModel } from '../models/company-profile';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _registerUrl = environment.API_URL+"/users";
 private _loginUrl = environment.API_URL+"/users/login";
 private _myInfoUrl = environment.API_URL+"/users/me";
 private _generateTokenUrl = environment.API_URL+"/users/token";
 private _generateTokenVerifyUrl= environment.API_URL+"/users/tokenexist";


  constructor(private http: HttpClient, private _token:TokenStorageService,) { }

 
async authStatus(){
    const token = JSON.parse(this._token.getToken());
   
    if(!token) return false;

    if (this.tokenExpired(token.token)) {
      if(!await this.refreshToken(token)){
        return false;
      }
    }
    if(!token.isLoggedIn) return false;
    return true;
  }
  companyStatus(){
    const token = JSON.parse(this._token.getToken());
    if(!token) return false;
    if(token.companyId == ""){
      return false;
    }
    return true;
  }
  async refreshToken(token):Promise<boolean>{
    var promise =  await new Promise<boolean>((resolve, reject) => {
      this.tokenVerify(token).subscribe({
        next: (res: any) => {
              this._token.signOut();
              this._token.saveToken(res);
              resolve(true);
        },
        error: async (err: any) => {
          this._token.signOut();
          await this._token.deleteToken(token);
          resolve(false);
        }
      });
    });
    return promise;
  }
  private tokenExpired(token) {
   
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  registerUser(user :Register){
    return this.http.post<Token>(this._registerUrl,user);
  }
  loginUser(user :Login){
    return this.http.post<Token>(this._loginUrl,user);
  }
  myInfo(){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization': `${token.token}`
      })
    
     return this.http.get<Register>(this._myInfoUrl, {'headers': headers });
    }
  }

  tokenVerify(token :string){
   return this.http.post<Token>(this._generateTokenUrl,token);
  }
  tokenexist(token :string){
    return this.http.post<Token>(this._generateTokenVerifyUrl,token);
   }

}
