import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notLogedInGuard } from './not-loged-in.guard';

describe('notLogedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notLogedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
