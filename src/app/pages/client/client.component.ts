import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NavbarComponent, FooterComponent],
  exportAs: 'app-login-pages',
  template: `
    <app-navbar></app-navbar>
    <div class="flex flex-col min-h-screen">
      <div class="flex-grow">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .flex {
      display: flex;
    }
    .flex-col {
      flex-direction: column;
    }
    .min-h-screen {
      min-height: 100vh;
    }
    .flex-grow {
      flex-grow: 1;
    }
  `]
})


export class ClientComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const id = params['id'];
      const email = params['email'];
      const username = params['username'];
      const avatar = params['avatar'];
      const role = params['role'] || 'user';

      if (token && id && email && username && avatar) {
        const user = { token, id, email, username, avatar, role };

        // Verificar si estamos en el navegador antes de acceder a localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Actualizar el estado del usuario en el servicio de autenticación
        this.authService.setUser(user);
      }
    });
  }
}
