import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseStockService {

  product_url : string = '';


  constructor(private http: HttpClient) {
    this.product_url = "http://[::1]:3000/";

   }

   
}
