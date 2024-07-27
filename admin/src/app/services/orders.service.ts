import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url : string =''
  constructor(private http: HttpClient) {
    this.url = 'http://[::1]:3000/'
   }

  GetNewOrders(limit, skip):Observable<any>{
    return this.http.get<any>(this.url + `finalorders?filter[limit]=${limit}&filter[skip]=${skip}`)
  }

  NewOrdersCount():Observable<any>{
    return this.http.get<any>(this.url + 'finalorders/count')
  }
  
  patchOrder(order_id, data):Observable<any>{
    return this.http.patch<any>(`${this.url}orders/${order_id}`, data)
  }

  PastOrdersCount():Observable<any>{
    return this.http.get<any>(this.url + 'pastorders/count')
  }

  GetPastOrders(limit, skip):Observable<any>{
    return this.http.get<any>(`${this.url}pastorders?filter[limit]=${limit}&filter[skip]=${skip}`)
  }

}
