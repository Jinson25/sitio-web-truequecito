import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../shared/interfaces/auth.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  menuItems = [
    { name: 'Inicio', link: '/' },
    { name: 'Productos', link: '#producto' },
    { name: 'Nosotros', link: '/about' },
  ];
  isLogged: boolean = false;
  notificationCount: number = 0;
  showDropdown: boolean = false;

  private authSubscription: Subscription = new Subscription();
  private notificationSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authSubscription.add(
      this.authService.authObservable.subscribe((authResponse) => {
        this.user = authResponse;
        this.isLogged = !!authResponse;
        if (this.isLogged) {
          this.notificationService.fetchNotifications();
        }
      })
    );

    this.notificationSubscription = this.notificationService.getNotifications().subscribe(notifications => {
      this.notificationCount = notifications.filter(notification => !notification.read).length;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.notificationSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}
