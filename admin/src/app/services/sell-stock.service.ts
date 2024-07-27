import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


export interface SellStock {
  sell_stock_id : number,
  sold_quantity : number;
  sold_date : Date,
  product_id : number,
}

@Injectable({
  providedIn: 'root'
})
export class SellStockService {

  stock_url : string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.stock_url = "http://[::1]:3000/";

   }


   getAllSoldStocks (): Observable<SellStock[]> {
    return this.http.get<SellStock[]>(this.stock_url + 'sell-stocks')
             
  }

  getOneSoldStock (id): Observable<SellStock[]> {
    return this.http.get<SellStock[]>(this.stock_url + 'sell-stocks/' + id)
     
  }

  updateSoldStock (id,stock): Observable<any> {
    return this.http.put(this.stock_url + 'sell-stocks/' + id, stock, {observe : 'response'})
    
  }



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addStock (stock): Observable<any> {
    return this.http.post<any>(this.stock_url + 'sell-stocks', stock, {observe : 'response'}  )
  }


  deleteSellStock (stock: SellStock | number): Observable<SellStock> {
    const id = typeof stock === 'number' ? stock : stock.sell_stock_id;
    const url = `${this.stock_url}/${id}`;
  
    return this.http.delete<SellStock>(this.stock_url + 'sell-stocks/' + stock, {observe : 'response'} ).pipe(
      map(Response => {
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
      this.toastr.error(`${operation} failed: ${error.status}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
*/
}
