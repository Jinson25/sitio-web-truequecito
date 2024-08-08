import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginPagesComponent } from './pages/client/login-pages/login-pages.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import { HomePageComponent } from './pages/client/home-page/home-page.component';
import { RegisterPagesComponent } from './pages/client/register-pages/register-pages.component';
import { ProfilePageComponent } from './pages/client/profile-page/profile-page.component';
import { CreatProductPagesComponent } from './pages/client/creat-product-pages/creat-product-pages.component';
import { ProposeExchangePagesComponent } from './pages/client/propose-exchange-pages/propose-exchange-pages.component';
import { UserProductsComponent } from './pages/client/user-products/user-products.component';
import { EditProductPageComponent } from './pages/client/edit-product-page/edit-product-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProposalsListComponent } from './components/proposals-list/proposals-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UsersProfileComponent } from './pages/client/users-profile/users-profile.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { GestionUsuarioComponent } from './pages/admin/gestion-usuario/gestion-usuario.component';
import { GestionProductosComponent } from './pages/admin/gestion-productos/gestion-productos.component';
import { GestionIntercambiosComponent } from './pages/admin/gestion-intercambios/gestion-intercambios.component';
import { ReportesComponent } from './pages/admin/reportes/reportes.component';
import { ConfiguracionComponent } from './pages/admin/configuracion/configuracion.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { NotificationsComponent } from './components/notifications/notifications.component'; // Importa el componente de notificaciones
import { adminGuard } from './guards/admin.guard';
import { AboutPagesComponent } from './pages/client/about-pages/about-pages.component';

const titleGlobal = 'Trueques |';

export const routes: Routes = [
  {
    path: '', component: ClientComponent,
    title: `${titleGlobal} Cliente`,
    children: [
      { path: '', component: HomePageComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'login', component: LoginPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Login` },
      { path: 'register', component: RegisterPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Register` },
      { path: 'profile', component: ProfilePageComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Perfil` },
      { path: 'profile/products', component: UserProductsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Mis Productos` },
      { path: 'profile/edit-product/:id', component: EditProductPageComponent, canActivate: [AuthGuard] },
      { path: 'createProduct', component: CreatProductPagesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Crear Producto` },
      { path: 'propose-exchange/:id', component: ProposeExchangePagesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Postular Intercambio` },
      { path: 'request-for-proposals', component: ProposalsListComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Propuestas de Intercambio` },
      { path: 'product/:id/:exchangeId', component: ProductDetailComponent, canActivate: [AuthGuard], title: `${titleGlobal} Detalle del Producto` },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard], title: `${titleGlobal} Pago` },
      { path: 'payment/:exchangeId', component: PaymentComponent, canActivate: [AuthGuard], title: `${titleGlobal} Pago` },
      { path: 'user-profile/:Id', component: UsersProfileComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { animation: 'HomePage' }, title: `${titleGlobal} Perfil de Usuario` },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard], title: `${titleGlobal} Notificaciones` }, // Nueva ruta para notificaciones
      { path: 'about', component: AboutPagesComponent, pathMatch: 'full', data: { animation: 'HomePage' }, title: `${titleGlobal} Nosotros` },
    ]
  },
  {
    path: 'dashboard', component: AdminComponent,
    title: `${titleGlobal} Dashboard`,
    canActivate: [adminGuard],
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'gestion-usuarios', component: GestionUsuarioComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'gestion-productos', component: GestionProductosComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'gestion-intercambios', component: GestionIntercambiosComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'gestion-reportes', component: ReportesComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'configuracion', component: ConfiguracionComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'gestion-roles', component: RolesComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
    ]
  },
  {
    path: '**', component: NotFound404Component,
    title: `${titleGlobal} 404`,
  }
];
