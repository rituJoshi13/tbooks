import { AuthGuard } from './services/auth.guard';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CompanyAuthGuard } from './services/company-auth.guard';
import { LoginAuthGuard } from './services/login-auth.guard';
import { LoadingInterceptor } from './services/loading.interceptor';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    CompanyProfileComponent,
    VendorsComponent,
    HomeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    AgGridModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    TokenStorageService,
    AuthGuard,
    CompanyAuthGuard,
    LoginAuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    
    },
    {
    provide: LocationStrategy, useClass: PathLocationStrategy 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
