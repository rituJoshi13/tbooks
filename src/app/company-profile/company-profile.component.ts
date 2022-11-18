import { Component, OnInit } from '@angular/core';
import { CompanyProfileModel } from '../models/company-profile';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfileModel = new CompanyProfileModel();
  constructor() { }

  ngOnInit(): void {
    
  }
  onSubmit() {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.log(this.companyProfileModel);
  }
}
