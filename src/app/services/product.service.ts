import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Product } from '../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  getAllProductsBySearch(searchTerm: string): Observable<Product[]> {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    return this.http.get<Product[]>(`/api/products/search/${encodedSearchTerm}`).pipe(
      catchError(error => {
        console.error('Error en búsqueda de productos:', error);
        return throwError(() => new Error('Error en la búsqueda de productos. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  getUserProducts(): Observable<Product[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<Product[]>('/api/products/user-products', { headers });
  }

  getProducts(): Observable<Product[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<Product[]>('/api/products', { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('Error al obtener productos.'));
      })
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/${productId}`);
  }

  createProduct(product: Product): Observable<Product> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<Product>('/api/products', product, { headers });
  }

  editProduct(productId: string, product: Product): Observable<Product> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.put<Product>(`/api/products/${productId}`, product, { headers });
  }

  deleteProduct(productId: string): Observable<void> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.delete<void>(`/api/products/${productId}`, { headers });
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
