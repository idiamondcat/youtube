import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<true | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthorized = authService.isLogin.pipe(
    map((value) => {
      if (value) {
        return value;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  );
  return isAuthorized;
};
