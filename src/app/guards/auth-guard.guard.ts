import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";


export const AuthGuard = () => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    router.navigateByUrl('/login')
    return false
  }
  return true
}