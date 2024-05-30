import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> | Promise<GuardResult> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/admin', 'login']);
    }
    return false;
  }
}
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
