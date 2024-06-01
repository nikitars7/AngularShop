import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  create(product) {
    return this.http
      .post(`${environment.fbDataBaseUrl}/products.json`, product)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }
  getAll() {
    return this.http.get(`${environment.fbDataBaseUrl}/products.json`).pipe(
      map((res) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }
  getById(id: string) {
    return this.http
      .get(`${environment.fbDataBaseUrl}/products/${id}.json`)
      .pipe(
        map((res: Product) => {
          return {
            ...res,
            id,
            date: new Date(res.date),
          };
        })
      );
  }
  remove(id: string) {
    return this.http.delete(`${environment.fbDataBaseUrl}/products/${id}.json`);
  }
  update(product: Product) {
    return this.http.patch(
      `${environment.fbDataBaseUrl}/products/${product.id}.json`,
      product
    );
  }
}
