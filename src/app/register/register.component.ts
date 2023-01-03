import { Component, OnInit } from '@angular/core';
import { Register } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerModal = new Register();
  confirmPassword:string= '';
  form = {
    firstName: '',
    lastName: '',
    email: '',
    userPassword: '',
    userConfirmPassword: '',
  };

  constructor(
    private _auth:AuthService,
    private _token:TokenStorageService,
    private _router:Router,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
  
  
  }
  async onSubmit() {
  
  if(await this.registerUser()){
    this._router.navigate(['/company-profile']);
  }
  }


  async registerUser():Promise<boolean>{
    var promise =  await new Promise<boolean>((resolve, reject) => {
      this._auth.registerUser(this.registerModal).subscribe({
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
