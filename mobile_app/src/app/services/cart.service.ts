import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UrlService } from './url.service'



@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart_count = new BehaviorSubject(null);
  
  x;
  constructor(private http: HttpClient, public urlService : UrlService ) { }

  
  getProductDetails (limit, skip): Observable<any> {
    return this.http.get<any>( this.urlService.url +'products?filter[include][0][relation]=stocks&filter[include][1][relation]=productPrices')
          
  }

  getProductCount():Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'products/count')
  }


  getCartItems (id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'users/' + id + '/carts/prices' )
          
  }


  getProduct_id (id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'carts?filter[where][user_id]=' + id + '&filter[fields][product_id]=true')
          
  }

  

  getOneProduct (id): Observable<any[]> {
    return this.http.get<any[]>(this.urlService.url + 'carts/' + id)
      
  }

  getCartCount (id): Observable<any> {
    return this.http.get<any[]>(this.urlService.url + 'users/' + id + '/carts/count')
      
  }


  updatecartItem (user_id,cart_id,cart): Observable<any> {
    return this.http.patch(this.urlService.url + 'users/' + user_id + '/carts/' + cart_id, cart, {observe : 'response'})
  }


  GetOneCartItem(user_id, cart_id): Observable<any>{
    return this.http.get(this.urlService.url +'users/' + user_id + '/carts/' + cart_id )
  } 
 

  addTocart (cart): Observable<any> {
    return this.http.post<any>(this.urlService.url + 'carts', cart, {observe : 'response'}  )
  }


  deleteCartItem ( user_id: any | number,cart_id: any | number): Observable<any> {
  
    return this.http.delete<any>(this.urlService.url + 'users/' + user_id +  '/carts/' + cart_id, {observe : 'response'} ).pipe(
      map(Response => {
        if(Response.status == 204 ) {

          console.log("deleted succesfully")
        
        }
  
        else {
          console.log("not deletd")
        }
      }),
      catchError(<any>('deleteCartItem'))
    );
  }


clearCart(user_id):Observable<any>{
  return this.http.delete<any>(this.urlService.url + 'users/' + user_id + '/carts')
} 

getCartOnly(user_id):Observable<any>{
  return this.http.get<any>(this.urlService.url + 'users/' + user_id + '/carts')
}

final_count(id){
 this.getCartCount(id).subscribe(data => {
   if(data){
     this.cart_count.next(data.count)
   }
 })
  
}



}
