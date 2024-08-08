import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Datos del formulario:', this.email, this.password);
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.message = 'Inicio de sesión exitoso';
          if (response.user.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.message = error.error?.message || 'Error en el inicio de sesión';
        }
      });
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithDiscord(): void {
    this.authService.loginWithDiscord();
  }
}
