import { Component, OnInit } from '@angular/core';
import { CompanyProfileModel } from '../models/company-profile';

import { AuthService } from '../services/auth.service';
import { CompanyProfileService } from '../services/company-profile.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Token } from '../models/auth';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfileModel = new CompanyProfileModel();
  allStates=[];
  constructor(
    private _router: Router,
    private _auth:AuthService,
    private _company:CompanyProfileService,
    private _token:TokenStorageService
 
    ) { }

  ngOnInit(): void {
    this.me();
    this.getState();
  }
  async me(){
    const token = JSON.parse(this._token.getToken()); 
   
    if(token){
      this.companyProfileModel.email = token.email;
      this.companyProfileModel.cFirstName = token.firstname;
      this.companyProfileModel.cLastName = token.lastname;
    }
    
  
  }
  async getState(){
    var promise =  await new Promise<boolean>((resolve, reject) => {
       this._company.getAllState().subscribe({
         next: (res: any) => {
          this.allStates=res;
          console.log(this.allStates);
           resolve(true);
         },
         error: (err: any) => {
           resolve(false);
         }
       });
     });
    
     return promise;
   }
  onSubmit() {
    this.addCompany();
  }
  async addCompany(){
    var promise =  await new Promise<boolean>((resolve, reject) => {
     var addCompany = {
      "compnay_name":this.companyProfileModel.companyName,
      "contact_firstname":this.companyProfileModel.cFirstName,
      "contact_lastname":this.companyProfileModel.cLastName,
      "street_address":this.companyProfileModel.streetAddress,
      "city":this.companyProfileModel.city,
      "state":this.companyProfileModel.state,
      "company_email":this.companyProfileModel.email,
      "mobile_number":this.companyProfileModel.mobile,
     }
      this._company.addCompany(addCompany).subscribe({
        next: (res: any) => {
          //this.updateToken(res._id);
          this._router.navigate(['/vendors']);
          resolve(true);
        },
        error: (err: any) => {
          resolve(false);
        }
      });
    });
   
    return promise;
  }
  updateToken(id:string){
    const token=JSON.parse(this._token.getToken()); 
    const newToken={
      firstName:token.firstName,
      lastName:token.lastName,
      companyId:id,
      isLoggedIn:token.isLoggedIn,
      token:token.token
    }
    this._token.signOut();
    this._token.saveToken(newToken as Token);
   
  }
}
