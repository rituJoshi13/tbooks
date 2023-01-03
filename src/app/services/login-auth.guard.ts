import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

@Injectable()
export class LoginAuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _token:TokenStorageService,
        private route: ActivatedRoute,) { }
        async canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot):  Promise<boolean> {
                if(await this._auth.authStatus()){
                    if(this._auth.companyStatus()){
                        this._router.navigate(['/vendors']);
                        return false;
                    }
                    this._router.navigate(['/company-profile']);
                    return false;
                }

                return true;
        }
}