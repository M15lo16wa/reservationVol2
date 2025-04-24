import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AuthGuard = () => {
  const authService = Inject(AuthService);
  const router = Inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
