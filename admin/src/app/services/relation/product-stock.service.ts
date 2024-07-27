import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Stock {

  stock_id : number,
  totalQuantity : number,
  RemainingQuantity : number,
  product_id :  number
}

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

  product_url : string = '';


  constructor(private http: HttpClient) {
    this.product_url = "http://[::1]:3000/";

   }

   getOneProduct (id): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.product_url + 'products/' + id + '/stocks')
          .pipe(
              catchError(this.handleError<Stock[]>('getOneProduct',[]))
    )

  }


  getRelatedStocks(id):  Observable<Stock[]> {
    return this.http.get<Stock[]>(this.product_url + 'products/' + id + '/stocks')
    .pipe(
        catchError(this.handleError<Stock[]>('getRelatedStocks',[]))
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
