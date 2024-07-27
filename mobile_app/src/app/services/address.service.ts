import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service'

export interface Address {
  address_id : number,
  pincode : string,
  address_line1 : string,
  address_line2 : string,
  landmark : string,
  city : string,
  state : string,
  alternate_mobile_no : string,
  user_id : number
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private http: HttpClient, public UrlService : UrlService) {
   
   }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

   getAllAddress (id): Observable<Address[]> {
    return this.http.get<Address[]>(this.UrlService.url +'users/' + id + '/addresses')
          
  }

  getdefaultAddress(id) : Observable<any> { 
    return this.http.get<any>(this.UrlService.url + 'users/' + id + '/addresses' + '?filter[where][default]=true')
  }

  getOneAddress (user_id, address_id): Observable<any> {
    return this.http.get<any>(this.UrlService.url + 'users/' + user_id + '/address/' + address_id)
      
  }

  updateAddress (user_id,address_id,address): Observable<any> {
    return this.http.put(this.UrlService.url + 'users/' + user_id + '/addresses/' + address_id, address, {observe : 'response'})
  
  }

  patchAddress (user_id,address_id,address): Observable<any> {
    return this.http.patch<any>(this.UrlService.url + 'users/' + user_id + '/addresses/' + address_id, address, {observe : 'response'})
  
  }

  addAddress (address): Observable<any> {
    return this.http.post<any>(this.UrlService.url + 'addresses', address, {observe : 'response'}  )
  }

  getFirstAddress(id): Observable<any>{
    return this.http.get<any>(this.UrlService.url + 'users/' + id +'/addresses?filter[limit]=1'  )
  }

  deleteAddress (user_id,address_id: any | number): Observable<any> {
  
    return this.http.delete<any>(this.UrlService.url + 'users/' + user_id + '/addresses/' + address_id, {observe : 'response'} ).pipe(
      
    );
  }

  wholeAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.UrlService.url  + '/addresses' )

  }

}
