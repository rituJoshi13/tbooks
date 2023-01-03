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
  constructor(
    private _router: Router,
    private _auth:AuthService,
    private _company:CompanyProfileService,
    private _token:TokenStorageService
 
    ) { }

  ngOnInit(): void {
    this.me();
  }
  async me():Promise<boolean>{
    var promise =  await new Promise<boolean>((resolve, reject) => {
     
      this._auth.myInfo().subscribe({
        next: (res: any) => {
          this.companyProfileModel.email = res[0].email;
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
     
      this._company.addCompany(this.companyProfileModel).subscribe({
        next: (res: any) => {
          this.updateToken(res._id);
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
