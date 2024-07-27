import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductPurchaseService {

  product_url : string = '';

  constructor(private http: HttpClient) {
    this.product_url = "http://[::1]:3000/";

   }

   getRelatedPurchase(id):  Observable<any> {
    return this.http.get<any>(this.product_url + 'products/' + id + '/purchases')

   }



   deletePurchase (product_id,purchase: any | number): Observable<any> {
    const id = typeof purchase === 'number' ? purchase : purchase.purchase_id;
    const url = `${this.product_url}/${id}`;
  
    return this.http.delete<any>(this.product_url + 'products/' + product_id + '/purchases', {observe : 'response'} ).pipe(
     
      catchError(this.handleError<any>('deletePurchase'))
    );
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
