import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service'

export interface Orders {
  order_id : string;
  date : Date;
  razorpay_orderid : string;
  razorpay_paymentid : string;
  status : string;
  amount : number;
  payment_type : string;
  user_id : number;
  address_id : number;

}


export interface OrdredProduct {
  op_id : number;
  quantity : number;
  price : number;
  product_id : number;
}

@Injectable({
  providedIn: 'root'
})
export class OurOrdersService {


  constructor(private http: HttpClient, public urlService : UrlService) {}

  
   getAllOrders (id): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.urlService.url + 'users/' + id +'/orders')         
  }

  getOneOrder (user_id, order_id): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.urlService.url + 'users/' + user_id + '/orders/' + order_id)      
  }

  updateOrders (user_id,order_id,order): Observable<any> {
    return this.http.patch<any>(this.urlService.url + 'users/' + user_id + '/orders/' + order_id , order, {observe : 'response'})
  
  }

  addOrder (cart): Observable<any> {
    return this.http.post<any>(this.urlService.url + 'orders', cart, {observe : 'response'}  )
  }


  
  deleteOrder ( user_id: any | number,order_id: any | number): Observable<any> {
  
    return this.http.delete<any>(this.urlService.url + 'users/' + user_id +  '/orders/' + order_id, {observe : 'response'} ).pipe(
      catchError(<any>('deleteOrder'))
    );
  }

  postOrderedProducts(products): Observable<any> {
    return this.http.post<any>(this.urlService.url + 'ordered-products', products, {observe : 'response'}  )
  }


}
