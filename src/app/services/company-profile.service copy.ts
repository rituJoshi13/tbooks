import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { CompanyProfileModel } from '../models/company-profile';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {
  private _addCompanyUrl = environment.API_URL+"/company";
  private _statesUrl = environment.API_URL+"/all-state";
  constructor(private http: HttpClient,private _token:TokenStorageService) { }
  

  addCompany(company :CompanyProfileModel){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization': `${token.token}`
      })
    
     return this.http.post<CompanyProfileModel>(this._addCompanyUrl,company, {'headers': headers });
    }
    
   
  }
  getAllState(){
      const token=JSON.parse(this._token.getToken()); 
      if(token != null){
        const headers = new HttpHeaders({
          'authorization': `${token.token}`
        })
        return this.http.get<any>(this._statesUrl, {'headers': headers });
    }
  }
}
