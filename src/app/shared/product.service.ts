import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  create(product) {
    return this.http.post(
      `${environment.fbDataBaseUrl}/products.json`,
      product
    );
  }
}
