import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendorProfileModel } from './../models/vendor-profile';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private _addVendorUrl = environment.API_URL+"/create-vendor";
  private _updateVendorUrl = environment.API_URL+"/update-vendor";
  private _getVendorUrl = environment.API_URL+"/vendorby-client";
  private _getCompanyByIdUrl = environment.API_URL+"/client-info";
  private _destroyVendorUrl = environment.API_URL+"/destroy-vendor";
  constructor(
    private http: HttpClient,
    private _token:TokenStorageService
    ) { }
    addVendorApi(vendor :VendorProfileModel){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization': `Bearer ${token.token}`
      })
    
     return this.http.post<VendorProfileModel>(this._addVendorUrl,vendor, {'headers': headers });
    }
  }
  updateVendorApi(id:string,vendor :VendorProfileModel){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization': `Bearer ${token.token}`
      })
    
     return this.http.post<VendorProfileModel>((this._updateVendorUrl+`/${id}`),vendor, {'headers': headers });
    }
  }
  destroyVendorApi(id:string){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization': `Bearer ${token.token}`
      })
    
     return this.http.get<VendorProfileModel>((this._destroyVendorUrl+`/${id}`), {'headers': headers });
    }
  }
  getVendors(){
    const token=JSON.parse(this._token.getToken()); 
    if(token != null){
      const headers = new HttpHeaders({
        'authorization':  `Bearer ${token.token}`
      })
    
     return this.http.get<VendorProfileModel>((this._getVendorUrl+`/${token.client_id}`), {'headers': headers });
  }
}
getCompanyById(){
  const token=JSON.parse(this._token.getToken()); 
  if(token != null){
    const headers = new HttpHeaders({
      'authorization':  `Bearer ${token.token}`
    })
    return this.http.get<any>((this._getCompanyByIdUrl+`/${token.client_id}`), {'headers': headers });
}
}
}
