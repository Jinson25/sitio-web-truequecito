import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_ADMIN_INFO } from '../shared/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private apiUrl = URL_ADMIN_INFO;

  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createInfo(info: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, info);
  }

  updateInfo(id: string, info: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, info);
  }

  deleteInfo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}