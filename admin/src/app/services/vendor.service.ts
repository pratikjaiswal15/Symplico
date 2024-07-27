import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  vendor_url : string = '';


  constructor(private http: HttpClient) {
    this.vendor_url = "http://[::1]:3000/";
   }

  SellerFormMobile(mobile): Observable<any> {
    return this.http.get<any>(this.vendor_url + 'vendors?filter[where][mobile_no]=' + mobile)
    
  }

  five_vendors():Observable<any>{
    return this.http.get<any>(this.vendor_url + 'five_vendors')
  }

  search_vendors(data):Observable<any>{
    return this.http.get<any>(`${this.vendor_url}/vendor_autocomplete/${data}`)

  }

}
