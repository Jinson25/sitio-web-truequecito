import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/interfaces/auth.interfaces';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileInfoCardComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  goToProfile(): void {
    // Asegúrate de que router es inyectado correctamente si no lo es actualmente
    this.router.navigate(['/profile']);
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
