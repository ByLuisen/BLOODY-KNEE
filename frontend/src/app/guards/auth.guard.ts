import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class AuthGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      map((logged) => {
        if (logged) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authGuardService = inject(AuthGuardService);
  return authGuardService.canActivate();
};
