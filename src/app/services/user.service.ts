import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../shared/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly apiUrl = 'api-rest-truequecito.onrender.com/api/auth/user';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  updateUserProfile(user: User): Observable<User> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    
    return this.http.put<User>(`${this.apiUrl}/profile`, user, { headers }).pipe(
      catchError(error => {
        console.error('Error actualizando perfil:', error);
        return throwError(() => new Error('Error al actualizar perfil. Inténtalo de nuevo más tarde.'));
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
