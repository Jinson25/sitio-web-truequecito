import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_ADMIN_USERS, URL_ADMIN_CREATE_USER, URL_ADMIN_EDIT_USER, URL_ADMIN_DELETE_USER, URL_ADMIN_PRODUCTS, URL_ADMIN_CREATE_PRODUCT, URL_ADMIN_EDIT_PRODUCT, URL_ADMIN_DELETE_PRODUCT, URL_ADMIN_ROLES, URL_ADMIN_CREATE_ROLE, URL_ADMIN_EDIT_ROLE, URL_ADMIN_DELETE_ROLE, URL_ADMIN } from '../shared/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  // Usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(URL_ADMIN_USERS);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(URL_ADMIN_CREATE_USER, user);
  }

  editUser(id: string, user: any): Observable<any> {
    return this.http.put(URL_ADMIN_EDIT_USER.replace(':id', id), user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(URL_ADMIN_DELETE_USER.replace(':id', id));
  }

  // Productos
  getAllProducts(): Observable<any> {
    return this.http.get(URL_ADMIN_PRODUCTS);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(URL_ADMIN_CREATE_PRODUCT, product);
  }

  editProduct(id: string, product: any): Observable<any> {
    return this.http.put(URL_ADMIN_EDIT_PRODUCT.replace(':id', id), product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(URL_ADMIN_DELETE_PRODUCT.replace(':id', id));
  }

  // Roles
  getAllRoles(): Observable<any> {
    return this.http.get(URL_ADMIN_ROLES);
  }

  createRole(role: any): Observable<any> {
    return this.http.post(URL_ADMIN_CREATE_ROLE, role);
  }

  editRole(id: string, role: any): Observable<any> {
    return this.http.put(URL_ADMIN_EDIT_ROLE.replace(':id', id), role);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(URL_ADMIN_DELETE_ROLE.replace(':id', id));
  }
  private baseUrl = URL_ADMIN; // Ajusta la URL según tu configuración

  getUserCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/user-count`);
  }

  getProductCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/product-count`);
  }

  getRoleCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/role-count`);
  }

  getExchangeCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/exchange-count`);
  }
}