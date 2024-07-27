import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service'

export interface Sell_stock {
  sell_stock_id : number;
  sold_quantity : number;
  sold_date	 : Date;
  product_id : number;
}



@Injectable({
  providedIn: 'root'
})
export class SellStockService {

  constructor(private http: HttpClient, public urlService : UrlService) {}

  AddSell_stock(product_id, stock):Observable<any> {
    return this.http.post<any>(this.urlService.url + 'products/' + product_id + '/sell-stocks' , stock, {observe :'response'})
  }

  Update_stock(product_id, stock):Observable<any>{
    return this.http.patch<any>(this.urlService.url + 'products/' + product_id + '/stocks/parch_quantity', stock, {observe :'response'})
  }

  getRemaining_quantity(product_id) : Observable<any>{
    return this.http.get<any>(this.urlService.url + 'products/' + product_id + '/stocks/remaining' )
  }
}


