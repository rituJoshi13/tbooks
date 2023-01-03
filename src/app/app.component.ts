import { Component } from '@angular/core';

import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tbooks';
  showLoader = false;
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(
  
    private router: Router,
   
  ) { }
 
  ngOnInit(): void {
  
    
}

}