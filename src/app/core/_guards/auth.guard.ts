import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CONSTANTES_SESION } from '../_util/services-util';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = sessionStorage.getItem(CONSTANTES_SESION.TOKEN);
        const correo = sessionStorage.getItem(CONSTANTES_SESION.CORREO);
        if (token !== undefined && token !== null && token.indexOf('') > -1 && correo !== null) {
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
        
}
