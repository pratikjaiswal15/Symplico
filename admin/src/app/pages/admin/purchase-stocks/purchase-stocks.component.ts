import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseStockService } from '../../../services/purchase-stock.service'
import { ProductService } from '../../../services/product.service'
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';


@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-purchase-stocks',
  templateUrl: './purchase-stocks.component.html',
  styleUrls: ['./purchase-stocks.component.scss']
})
export class PurchaseStocksComponent implements OnInit, OnDestroy {

  purchase_stock: any;
  
  searchTerm;
  subscrib1 : Subscription;
  
  constructor(public purchaseStockService : PurchaseStockService, public productService : ProductService) { 

  }

  ngOnInit() {
    this.getAllPurchaseStock()

  }

  getAllPurchaseStock() {
   this.subscrib1 = this.purchaseStockService.getAllPurchaseStock().subscribe(data => {
      
      if(data){
        this.purchase_stock =data;
        console.log(data)
      }     
    })
  }

  ngOnDestroy(){
    
  }
 
}
