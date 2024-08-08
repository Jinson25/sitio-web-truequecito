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

  private readonly apiUrl = 'https://api-rest-truequecito.onrender.com/api/user';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUserById(userId: string): Observable<{ user: User }> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<{ user: User }>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo usuario:', error);
        return throwError(() => new Error('Error al obtener usuario. Inténtalo de nuevo más tarde.'));
      })
    );
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
  
  

  followUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/follow`;

    const token = this.getToken();

    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error in followUser:', error);
        return throwError(() => new Error('Error al seguir al usuario. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  unfollowUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/unfollow`;
 
    const token = this.getToken();
 
    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error in unfollowUser:', error);
        return throwError(() => new Error('Error al dejar de seguir al usuario. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  likeUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}/like`;

    const token = this.getToken();

    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error in likeUser:', error);
        return throwError(() => new Error('Error al dar like al usuario. Inténtalo de nuevo más tarde.'));
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
