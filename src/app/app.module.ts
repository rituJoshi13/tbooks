import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { VendorsComponent } from './vendors/vendors.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    CompanyProfileComponent,
    VendorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    AgGridModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
