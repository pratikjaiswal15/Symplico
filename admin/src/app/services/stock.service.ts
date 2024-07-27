import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


export interface Stock {

  stock_id : number,
  totalQuantity : number,
  RemainingQuantity : number,
  product_id : number
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stock_url : string = '';

  constructor(private http: HttpClient,  private toastr: ToastrService) { 
    this.stock_url = "http://[::1]:3000/";

  }


  getAllStocks (): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stock_url + 'stocks/product')
             
  }

  getOneStock (id): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stock_url + 'stocks/' + id)
   
  }

  updateStock (id,stock): Observable<any> {
    return this.http.put(this.stock_url + 'stocks/' + id, stock, {observe : 'response'})
  
  }
  

  addStock (stock): Observable<any> {
    return this.http.post<any>(this.stock_url + 'stocks', stock, {observe : 'response'}  )
  }

  
  deleteStock (stock: Stock | number): Observable<Stock> {
    const id = typeof stock === 'number' ? stock : stock.stock_id;
    const url = `${this.stock_url}/${id}`;
  
    return this.http.delete<Stock>(this.stock_url + 'stocks/' + stock, {observe : 'response'} ).pipe(
    //  tap(_ => console.log(`deleted stock id=${id}`)),
      map(Response => {
      //  console.log(Response.status)
        if(Response.status == 204 ) {
          this.toastr.success("Data successfully deleted from database");
        }
  
        else {
          this.toastr.error("Something went wrong! Please try again later")
        }
      }),
      catchError(<any>('deleteStock'))
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
