import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
    { name: 'Inicio', link: '/home' },
    { name: 'Servicios', link: '/services' },
    { name: 'Chat', link: '/forum' }
  ];
  isLogged: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription.add(
      this.authService.authObservable.subscribe((authResponse) => {
        this.isLogged = !!authResponse;
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  jinson = 'Jinson';

}
