import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const collecteurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');
  const role = localStorage.getItem('role');
  if (role !== 'collecteur') {
    router.navigate(['/']);
    return false;
  }else{
    return true;
  }

};
