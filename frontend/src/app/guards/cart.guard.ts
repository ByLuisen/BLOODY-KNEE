import { CanActivateFn } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class CartGuardService {
  constructor(private http: HttpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.http.getCartFromDDBB().pipe(
      map((hasProducts) => {
        if (hasProducts.length != 0) {
          return true;
        } else {
          this.router.navigate(['/merchandising']);
          return false;
        }
      })
    );
  }
}

export const cartGuard: CanActivateFn = (route, state) => {
  const cartGuardService = inject(CartGuardService);
  return cartGuardService.canActivate();
};
