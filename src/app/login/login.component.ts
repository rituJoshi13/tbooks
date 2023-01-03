import { Component, OnInit } from '@angular/core';
import { Login } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginModal = new Login();
  constructor(
    private _auth:AuthService,
    private _token:TokenStorageService,
    private _router:Router,
    private _snackBar: MatSnackBar,
   
  ) { }

  ngOnInit(): void {
 
  }
  /*async getRoute():Promise<boolean>{
    var token = this._token.getToken();
    if(token){
      var promise =  await new Promise<boolean>((resolve, reject) => {
        this._auth.myInfo().subscribe({
          next: (v) => {
          
            if(v[0].companyId == ""){
              this._router.navigate(['/company-profile']);
              resolve(true);
            }
            else{
              this._router.navigate(['/vendors']);
              resolve(false);
            }
            this.loaderService.hideLoader();
          },
          error: (e) => {
            console.log("goes in");
            this._router.navigate(['/']);
           console.log(e);
          }
      });    
      });
      return promise
    }
    this.loaderService.hideLoader();
    return false;
  }*/
  async onSubmit() {
  
    if(await this.loginUser()){
     
      
      this._router.navigate(['/company-profile']);
    }
 
  }
  async loginUser():Promise<boolean>{
    var promise =  await new Promise<boolean>((resolve, reject) => {
     
      this._auth.loginUser(this.loginModal).subscribe({
        next: (res: any) => {
          this._token.saveToken(res);
          
          resolve(true);
        },
        error: (err: any) => {
         
          this._snackBar.open(err.error.toString() , '', {
            duration: 3000
          });
        
          resolve(false);
        }
      });
    });
   
    return promise;
  }
}
