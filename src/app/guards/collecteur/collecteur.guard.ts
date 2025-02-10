import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const collecteurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');

    if (!currentUser) {
      router.navigate(['/login']);
      return false;
    }

    if (currentUser.role !== 'collecteur') {
      router.navigate(['/']);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Error in collecteur guard:', error);
    router.navigate(['/login']);
    return false;
  }
};
