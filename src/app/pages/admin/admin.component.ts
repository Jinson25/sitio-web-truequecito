import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule, RouterModule, SidebarComponent],
  template: `
  <div class="flex">
  <app-sidebar></app-sidebar>
  <div class="flex-1 p-10  bg-gray-100">
    <!-- Aquí va el contenido principal -->
     <router-outlet></router-outlet>
  </div>
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
export class AdminComponent {

}
