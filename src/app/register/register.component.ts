import { Component, OnInit } from '@angular/core';
import { Register } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerModal = new Register();
  confirmPassword:string= '';
  form = {
    firstname: '',
    lastname: '',
    email: '',
    userPassword: '',
    userConfirmPassword: '',
  };

  constructor(
    private _auth:AuthService,
  
    private _router:Router,
    private _snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
  
  }
  async onSubmit() {
    await this.registerUser()
  }
  async registerUser():Promise<boolean>{
  
    var promise =  await new Promise<boolean>((resolve, reject) => {
      this._auth.registerUser(this.registerModal).subscribe({
        next: async (res: any) => { 
        
          var result = await this.requestSendEmail(this.registerModal.email);
          if(result){
          
            Swal.fire({
              text: "The verification email is being sent to registered email address",
              icon: 'succcess',
              confirmButtonColor: '#098EE2',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this._router.navigate(['/login']);
              }
            })
          }
        },
        error: (err: any) => {
        
          this._snackBar.open(err.message , '', {
            duration: 3000
          });
          resolve(false);
        }
      });
    });
    return promise;
  }
  async requestSendEmail(email):Promise<boolean>{
    var promise =  await new Promise<boolean>((resolve, reject) => {
      this._auth.emailVerify(email).subscribe({
        next: async (res: any) => { 
         
          resolve(true);
        },
        error: (err: any) => {
        
          this._snackBar.open(err.error.message , '', {
            duration: 3000
          });
          resolve(false);
        }
      });
    });
    return promise;
  }
}
