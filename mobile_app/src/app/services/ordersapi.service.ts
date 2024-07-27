import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service'


@Injectable({
  providedIn: 'root'
})
export class OrdersapiService {


  constructor(private http: HttpClient, public urlService : UrlService) {}

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

   
  CaptureOrder (options): Observable<any> {
    return this.http.post<any>(this.urlService.url + 'ordersapi', options, this.httpOptions)
  }

  getAllOrders (): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url +'ordersapi' )  
  }


  getOneOrder (id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'ordersapi/' + id)
      
  }

  getPayments(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'ordersapi/' + id + '/payments')
      
  }

  getOnePayment(id): Observable<any> {
    return this.http.get<any>(this.urlService.url + 'payments/' + id)
  }

}