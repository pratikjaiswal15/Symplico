import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  purchase_url: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.purchase_url = "http://[::1]:3000/";

  }

  getAllPurchases(): Observable<any> {
    return this.http.get<any>(this.purchase_url + 'purchases')
  }


  updatePurchase(id, purchase): Observable<any> {
    return this.http.put(this.purchase_url + 'purchases/' + id, purchase, { observe: 'response' })

  }

  addPurchase(purchase): Observable<any> {
    return this.http.post<any>(this.purchase_url + 'purchases', purchase, { observe: 'response' })
  }

  addPurchase_products(products): Observable<any> {
    return this.http.post<any>(this.purchase_url + 'purchase-products', products, { observe: 'response' })
  }

  getPurchaseSeller(id, limit, skip): Observable<any> {
    return this.http.get<any>(this.purchase_url + 'vendors/' + id + '/final_purchases?filter[limit]=' + limit + '&filter[skip]=' + skip)
  }

  deletePurchase(purchase: any | number): Observable<any> {

    return this.http.delete<any>(this.purchase_url + 'purchases/' + purchase, { observe: 'response' }).pipe(
      map(Response => {
        if (Response.status == 204) {
          this.toastr.success("Data successfully deleted from database");
        }

        else {
          this.toastr.error("Something went wrong! Please try again later")
        }
      }),
      catchError(<any>('deletePurchase'))
    );
  }

  GetPurchaseCount(venodr_id): Observable<any> {
    return this.http.get<any>(this.purchase_url + 'vendors/' + venodr_id + '/final_purchases/count')
  }
/*


*/

}
