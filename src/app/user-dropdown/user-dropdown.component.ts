import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  constructor( private _token:TokenStorageService,
    private _router: Router,) { }

  ngOnInit(): void {
  }
  doLogout(){
    this._token.signOut();
    this._router.navigate(['']);
  }
}
