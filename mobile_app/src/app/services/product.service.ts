import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, public urlService : UrlService) {}

   getAllProducts (): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'products')
          
  }

  getProductQuantity (id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'products/' + id + '/stocks')
          
  }

  getProductPrice (id): Observable<any[]> {
    return this.http.get<any[]>('http://[::1]:3000/products/2/purchases?filter[fields][totalprice]=true&filter[fields][date]=true')
          
  }

  


}
