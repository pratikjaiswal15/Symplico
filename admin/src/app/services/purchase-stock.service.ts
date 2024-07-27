import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


export interface PurchaseStock {
  purchase_stock_id : number,
  purchase_quantity : number,
  purchase_date : Date,
  product_id : number
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseStockService {

  purchaseStock_url : string = '';

  constructor(private http: HttpClient,  private toastr: ToastrService) {
    this.purchaseStock_url = "http://[::1]:3000/";

   }

   getAllPurchaseStock (): Observable<any> {
    return this.http.get<any>(this.purchaseStock_url + 'purchase-stocks/product')
           
  }


  getOnePurchaseStock (id): Observable<any> {
    return this.http.get<any>(this.purchaseStock_url + 'purchase-stocks/' + id)
        

  }


  updatePurchaseStock (id,purchaeStock): Observable<any> {
    return this.http.put(this.purchaseStock_url + 'purchase-stocks/' + id, purchaeStock, {observe : 'response'})
    
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addPurchaseStock (purchaeStock): Observable<any> {
    return this.http.post<any>(this.purchaseStock_url + 'purchase-stocks', purchaeStock, {observe : 'response'},   )
  }




  deletePurchsrStock (purchaeStock: PurchaseStock | number): Observable<PurchaseStock> {
    const id = typeof purchaeStock === 'number' ? purchaeStock : purchaeStock.purchase_stock_id;
  
    return this.http.delete<PurchaseStock>(this.purchaseStock_url + 'purchase-stocks/' + purchaeStock, {observe : 'response'} ).pipe(
//      tap(_ => console.log(`deleted purchase stock id=${id}`)),
      map(Response => {
        if(Response.status == 204 ) {
          this.toastr.success("Data successfully deleted from database");
        }
  
        else {
          this.toastr.error("Something went wrong! Please try again later")
        }
      }),
      catchError(<any>('deletePurchsrStock'))
    );
  }

/*
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      this.toastr.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.toastr.error(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


*/
}
