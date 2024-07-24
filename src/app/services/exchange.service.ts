import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Proposal } from '../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = '/api/exchanges';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  proposeExchange(productOffered: string, productRequested: string, userRequested: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Proposing exchange with headers:', headers);
    return this.http.post(`${this.apiUrl}/propose`, { productOffered, productRequested, userRequested }, { headers });
  }

  getReceivedExchanges(): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching received exchanges with headers:', headers);
    return this.http.get(`${this.apiUrl}/received`, { headers });
  }

  getSentExchanges(): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching sent exchanges with headers:', headers);
    return this.http.get(`${this.apiUrl}/sent`, { headers });
  }

  updateExchangeStatus(exchangeId: string, status: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Updating exchange status with headers:', headers);
    return this.http.put(`${this.apiUrl}/status`, { exchangeId, status }, { headers });
  }

  getExchangeById(exchangeId: string): Observable<Proposal> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching exchange by ID with headers:', headers);
    return this.http.get<Proposal>(`${this.apiUrl}/${exchangeId}`, { headers });
  }

  uploadReceipt(formData: FormData): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Uploading receipt with headers:', headers);
    return this.http.post(`${this.apiUrl}/upload-receipt`, formData, { headers });
  }
}

