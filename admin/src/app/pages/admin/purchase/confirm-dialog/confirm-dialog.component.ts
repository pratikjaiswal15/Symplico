import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { PurchaseService } from '../../../../services/purchase.service'
import { ProductStockService } from '../../../../services/relation/product-stock.service';
import { PurchaseStockService } from '../../../../services/purchase-stock.service';
import { StockService } from '../../../../services/stock.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {


  savedForLater : any;
  mobile: any;
  seller_id: any;
  total : any;
  check: any;
  stock_id: any;
  subscribe1 : Subscription
  subscribe2 : Subscription
  subscribe3 : Subscription
  subscribe4 : Subscription
  subscribe5 : Subscription
  subscribe6: Subscription;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, 
  public purchaseService : PurchaseService, public productStockService : ProductStockService, public purchaseStockService : PurchaseStockService,
  public stockService : StockService, private toastr: ToastrService)  { 
  
    console.log(data.data)
  
   
    console.log(data.data.vendor_mobile)
    this.seller_id =data.seller_id
    this.mobile = data.data.vendor_mobile
    this.savedForLater = data.data.product
    console.log(this.savedForLater)

  }


  getTotal() {

    this.total = this.savedForLater.reduce((i, j) => i + j.product_Buyingprice * j.product_quantity , 0);
    return this.total;
}


  ngOnInit() {
    
  }

  add(){
    console.log("add")

    let purchase = {
      purchase_id : uuidv4(),
      date : new Date().toISOString(),
      totalprice : this.total,
      vendor_id : this.seller_id
    }
    console.log(purchase)

   this.subscribe1 = this.purchaseService.addPurchase(purchase).subscribe(data => {
      console.log(data)
      if(data.status == 200 || data.status == 201 || data.status ==204) {
        console.log(data.body.purchase_id)

        for(let i=0 ;i< this.savedForLater.length; i++){
          console.log(this.savedForLater[i].product_name.product_id)
          console.log(this.savedForLater[i].product_quantity)
          console.log(this.savedForLater[i].product_Buyingprice)
    
          let products = {
            quantity : this.savedForLater[i].product_quantity,
            price : this.savedForLater[i].product_Buyingprice,
            purchase_id : purchase.purchase_id,
            product_id : this.savedForLater[i].product_name.product_id
          }
    
          console.log(products)

        this.subscribe2=  this.purchaseService.addPurchase_products(products).subscribe(x => {
            console.log(x)
            if(x.status == 200 || x.status == 201 || x.status ==204) {

              this.toastr.success("Purchase done successully")


              let purchase_stock : any = {
                purchase_quantity : x.body.quantity ,
                purchase_date : new Date().toISOString(),
                product_id : x.body.product_id
              }

              let addStock: any = {
                totalQuantity : x.body.quantity,
                RemainingQuantity : x.body.quantity,
                product_id : x.body.product_id
      
              }

              console.log(purchase_stock)
              console.log(addStock)

            this.subscribe3 =  this.purchaseStockService.addPurchaseStock(purchase_stock).subscribe(pur_stock => {
                console.log(pur_stock)
              })

             this.subscribe4 = this.productStockService.getOneProduct(x.body.product_id).subscribe(stocks => {
                this.check = stocks
                console.log(this.check)

                if(this.check == '') {
                 this.subscribe5 = this.stockService.addStock(addStock).subscribe(add => {
                    console.log(add)
                  })
                }

                else{
                  for(let i= 0; i< this.check.length; i++){
                    this.stock_id = this.check[i].stock_id

                    let update_stock : any ={
                      totalQuantity : x.body.quantity + this.check[i].totalQuantity,
                      RemainingQuantity : x.body.quantity + this.check[i].totalQuantity,
                      product_id : this.check[i].product_id,
                    
                    }
                    console.log(update_stock)  

                   this.subscribe6 =  this.stockService.updateStock(this.stock_id,update_stock).subscribe(update => {
                      console.log(update)
                    }) 

                  }
                }
              })         

            }
            else {
              this.toastr.error("something went wrong! Please try again")

            }   
          })
        
        }

      }
      else {
        this.toastr.error("something went wrong! Please try again")
      }
    })
    
    
  }

  ngOnDestroy(){
    
  }
}
