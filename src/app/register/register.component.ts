import { Component, OnInit } from '@angular/core';
import { Register } from '../models/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerModal = new Register();
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.registerModal);
  }
}
