import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProductPurchaseService } from '../services/relation/product-purchase.service'
import { PurchaseService } from '../services/purchase.service'
import { PurchaseStockService } from '../services/purchase-stock.service'
import { ProductStockService } from '../services/relation/product-stock.service'
import { StockService } from '../services/stock.service'
import { ProductSellStockService } from '../services/relation/product-sell-stock.service'
import { SellStockService } from '../services/sell-stock.service'


export interface Product {

  product_id : number,
  name : string,
  image_url : string,
  description : string,
  date : Date,
  sub_id : number

}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product_url : string = '';
  related_purchase;
  serial_no: any;
  related_stock;
  s_id;
  sell_stock;
  sell_id;


  constructor(private http: HttpClient,  private toastr: ToastrService,public productPurchaseService :ProductPurchaseService,
    public purchaseService : PurchaseService, public purchaseStockService : PurchaseStockService,public productStockService : ProductStockService,
    public stockService : StockService, public productSellStockService :ProductSellStockService, public sellStockService: SellStockService
    ) {
    this.product_url = "http://[::1]:3000/";
   }


   getAllProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.product_url + 'products')
                 
  }

  getOneProduct (id): Observable<Product[]> {
    return this.http.get<Product[]>(this.product_url + 'products/' + id)
          
  } 

  getAllProductsId (): Observable<Product[]> {
    return this.http.get<Product[]>('http://[::1]:3000/products?filter[fields][product_id]=true')
            
  }
  
updateProduct (id,product): Observable<any> {
    return this.http.put(this.product_url + 'products/' + id, product, {observe : 'response'})
   
  }

  patchProduct (id,product): Observable<any> {
    return this.http.patch(this.product_url + 'products/' + id, product, {observe : 'response'})
   
  }


  addProduct (product): Observable<any> {
    return this.http.post<any>(this.product_url + 'products', product, {observe : 'response'}  ).pipe(
      //tap((newProduct: any) => console.log(`added product w/ id=${newProduct.product_id}`)),
    );
  }

  getProductNames(): Observable<Product[]> {
    return this.http.get<Product[]>('http://[::1]:3000/products?filter[fields][name]=true')
  }
  
  postProductPrice(id,price): Observable<Product>{
    return this.http.post<Product>(this.product_url + 'products/' + id + '/product-price', price )
  }
  
  
  patchProductPrice(id,price): Observable<Product>{
    return this.http.patch<Product>(this.product_url + 'products/' + id + '/product-price', price )
  }

  ProductWithPRices() : Observable<Product>{
    return this.http.get<Product>(this.product_url + 'products?filter[include][][relation]=productPrices')
  }


  delete_image(image) : Observable<any>{
    console.log(image)
    return this.http.post<any>(`${this.product_url}delete-image`, image)
  }

/** DELETE: delete the hero from the server */
deleteProduct (product: Product | number): Observable<Product> {
  const id = typeof product === 'number' ? product : product.product_id;
  const url = `${this.product_url}/${id}`;

  return this.http.delete<Product>(this.product_url + 'products/' + product, {observe : 'response'} ).pipe(
   // tap(_ => console.log(`deleted product id=${id}`)),
    map(Response => {
     // console.log(Response.status)
      if(Response.status == 204 ) {
        this.toastr.success("Data successfully deleted from database");
          this.productPurchaseService.getRelatedPurchase(product).subscribe(data => {
            this.related_purchase = data
            if(this.related_purchase == '') {

            }
            else {
                for(let i=0; i<this.related_purchase.length;i++) {
                this.serial_no = this.related_purchase[i].serial_no
                this.purchaseService.deletePurchase(this.serial_no).subscribe(data =>{
                })
                this.purchaseStockService.deletePurchsrStock(this.serial_no).subscribe(data =>{
                })
              }
            }
                this.productStockService.getRelatedStocks(product).subscribe(data => {
                  this.related_stock = data
              
              if(this.related_stock == '') {
              }
              else {
                  for(let i = 0 ;i<this.related_stock.length; i++) {
                    this.s_id = this.related_stock[i].stock_id
                    this.stockService.deleteStock(this.s_id).subscribe(data =>{
                    })
              }
            }
            })
            this.productSellStockService.getRelatedSellStock(product).subscribe(data =>{
              this.sell_stock = data;

              if(this.sell_stock == '') {

              }

              else {
                for(let i=0 ; i<this.sell_stock.length; i++) {
                  this.sell_id = this.sell_stock[i].sell_stock_id
                 // console.log(this.sell_id)
                  this.sellStockService.deleteSellStock(this.sell_id).subscribe(data => {
                   // console.log(data)
                  })
                }
              }

            })


           
          })
      }

      else {
        this.toastr.error("Something went wrong! Please try again later")
      }
    }),
   catchError(<any>('deleteProduct'))
  );
}

get5Products():Observable<any>{
 return this.http.get<any>(this.product_url + 'five_products')
}

search_Products(input):Observable<any>{
  return this.http.get<any>(this.product_url + 'products?filter[fields][name]=true&filter[fields][product_id]=true&filter[limit]=10&filter[where][name][regexp]=' + input)
 }
}