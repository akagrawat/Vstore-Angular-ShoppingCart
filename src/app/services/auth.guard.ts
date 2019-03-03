import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private afAuth: AuthService, private router: Router) {

  }
  canActivate() {
    if ( this.afAuth.isLoggedIn() ) {
        return true;
    }
    this.router.navigate(['/']);
    return false;
}
}
