import { Component, OnInit } from '@angular/core';
import { Login } from '../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginModal = new Login();
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.loginModal);
  }
}
