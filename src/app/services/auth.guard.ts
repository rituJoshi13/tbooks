import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _token:TokenStorageService) { }
        canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean {

            if(!this._auth.authStatus()){
                this._router.navigate(['']);
                return false;
            }
             if(!this._auth.companyStatus()){
                this._router.navigate(['/company-profile']);
                return false;
            }
            return true;

        }
        
}