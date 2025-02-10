import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const notLogedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
