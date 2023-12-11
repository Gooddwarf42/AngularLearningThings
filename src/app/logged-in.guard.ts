import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const loggedInGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if (localStorage.getItem("loginmKey") == ("drago")) {
      return true;
    }
    const router = inject(Router);
    alert('Effettua l\'accesso');
    router.navigate(['']);
    return false;
  };
