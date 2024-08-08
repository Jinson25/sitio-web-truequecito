import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser(); // Método para obtener el usuario actual
    if (user && user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']); // Redirige a una página de no autorizado
      return false;
    }
  }
}
