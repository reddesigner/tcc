import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log('authGuard.service --- método canActivate');
    let url: string = state.url;
    return this.checkLogIn(url);
  }

  public checkLogIn(url: string): boolean {
    if (this.auth.isAuthenticated()) {
      console.log('authGuard.service ----- is logged in | has permission:', this.auth.getPermissionForRoute(url));
      // checar se tem a permissão...
      if (this.auth.getPermissionForRoute(url))
        return true;
      else
        return false;
    }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return true;
  }

}
