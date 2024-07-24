import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private http: HttpClient) {}
  searchProducts(searchTerm: string): Observable<any>{
    return this.http.get<any>(`${this.searchProducts}/${searchTerm}`);
  }
}
