import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-pages',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register-pages.component.html',
  styleUrls: ['./register-pages.component.css']
})
export class RegisterPagesComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.isPasswordStrong(this.password)) {
        this.message = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        Swal.fire({
          icon: 'warning',
          title: 'Contraseña insegura',
          text: this.message,
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.message = 'Las contraseñas no coinciden.';
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: this.message,
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }

      this.authService.register(this.email, this.password, this.username).subscribe({
        next: (response) => {
        
          this.message = 'Registro exitoso';
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu cuenta ha sido creada correctamente.',
            timer: 3000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/']);
          });
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.message = error.error?.message || 'Error en el registro';
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: this.message,
            timer: 3000,
            timerProgressBar: true
          });
        }
      });
    } else {
      this.message = 'Por favor, completa todos los campos.';
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: this.message,
        timer: 3000,
        timerProgressBar: true
      });
    }
  }

  isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithDiscord(): void {
    this.authService.loginWithDiscord();
  }
}
