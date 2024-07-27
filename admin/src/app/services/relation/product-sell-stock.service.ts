import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SellStock {
  sell_stock_id : number,
  sold_quantity : number;
  sold_date : Date,
  product_id : number,
}

@Injectable({
  providedIn: 'root'
})
export class ProductSellStockService {

  product_url : string = '';

  constructor(private http: HttpClient) {
    this.product_url = "http://[::1]:3000/";

   }


   getRelatedSellStock(id):  Observable<SellStock[]> {
    return this.http.get<SellStock[]>(this.product_url + 'products/' + id + '/sell-stocks')
    .pipe(
        catchError(this.handleError<SellStock[]>('getOneProduct',[]))
)

   }




   
   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
