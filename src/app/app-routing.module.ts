import { LoginAuthGuard } from './services/login-auth.guard';
import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VendorsComponent } from './vendors/vendors.component';
import { AuthGuard } from './services/auth.guard';
import { CompanyAuthGuard } from './services/company-auth.guard';



const routes: Routes = [
  { path: '', component: LoginComponent,canActivate:[LoginAuthGuard]},
  { path: 'register', component: RegisterComponent,canActivate:[LoginAuthGuard]},
  { path: 'company-profile', component: CompanyProfileComponent,canActivate:[CompanyAuthGuard] },
  { path: 'vendors', component: VendorsComponent ,canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'loader', component: LoaderComponent, },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
