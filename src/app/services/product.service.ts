import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, catchError, Observable, throwError, map, forkJoin } from 'rxjs';
import { Product } from '../shared/interfaces/product.interface';
import { Exchange } from '../shared/interfaces/exchange.interface';

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

    const products$ = this.http.get<Product[]>('/api/products/user-products', { headers });
    const exchanges$ = this.http.get<Exchange[]>('/api/exchanges/completed', { headers });

    return forkJoin([products$, exchanges$]).pipe(
      map(([products, exchanges]) => {
        console.log('Productos obtenidos:', products);
        console.log('Intercambios completados obtenidos:', exchanges);

        const completedProductIds = new Set<string>();
        exchanges.forEach(exchange => {
          if (exchange.productOffered && exchange.productOffered._id) {
            completedProductIds.add(exchange.productOffered._id.toString());
          }
          if (exchange.productRequested && exchange.productRequested._id) {
            completedProductIds.add(exchange.productRequested._id.toString());
          }
        });

        console.log('IDs de productos completados:', completedProductIds);

        const filteredProducts = products.filter(product => product && product._id && !completedProductIds.has(product._id.toString()));

        console.log('Productos después de filtrar:', filteredProducts);

        return filteredProducts;
      }),
      catchError(error => {
        console.error('Error al obtener productos del usuario:', error);
        return throwError(() => new Error('Error al obtener productos del usuario.'));
      })
    );
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
    return this.http.get<Product>(`/api/products/${productId}`).pipe(
      catchError(error => {
        console.error(`Error al obtener el producto con ID ${productId}:`, error);
        return throwError(() => new Error('Error al obtener el producto.'));
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<Product>('/api/products', product, { headers }).pipe(
      catchError(error => {
        console.error('Error al crear el producto:', error);
        return throwError(() => new Error('Error al crear el producto.'));
      })
    );
  }

  editProduct(productId: string, product: Product): Observable<Product> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.put<Product>(`/api/products/${productId}`, product, { headers }).pipe(
      catchError(error => {
        console.error(`Error al editar el producto con ID ${productId}:`, error);
        return throwError(() => new Error('Error al editar el producto.'));
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.delete<void>(`/api/products/${productId}`, { headers }).pipe(
      catchError(error => {
        console.error(`Error al eliminar el producto con ID ${productId}:`, error);
        return throwError(() => new Error('Error al eliminar el producto.'));
      })
    );
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
