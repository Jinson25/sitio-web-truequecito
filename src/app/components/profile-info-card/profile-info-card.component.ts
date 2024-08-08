import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/interfaces/auth.interfaces';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileInfoCardComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUser()?.id;
    if (userId) {
      this.loadUserProfile(userId);
    } else {
      this.loading = false;
      this.error = 'Usuario no autenticado';
    }
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserById(userId).pipe(
      catchError((error) => {
        console.error('Error loading user profile:', error);
        this.error = 'Error al cargar el perfil del usuario';
        this.loading = false;
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        console.log('Usuario recibido:', response.user);
        this.user = response.user;
      }
      this.loading = false;
    });
  }

  updateProfile(): void {
    if (this.user) {
      console.log('Actualizando perfil:', this.user);
      this.userService.updateUserProfile(this.user).subscribe({
        next: (updatedUser) => {
          console.log('Perfil actualizado:', updatedUser);
          this.user = updatedUser;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
