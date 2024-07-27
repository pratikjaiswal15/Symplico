import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { ProductService } from '../../../services/product.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, OnDestroy {

  stock_list;
 
  searchTerm;
  subscribe1 : Subscription;

  constructor(public stockService : StockService, public productService : ProductService) {
   }

  getAllStocks() {
   this.subscribe1 = this.stockService.getAllStocks().subscribe(data => {

      if(data){
        this.stock_list = data

      }
    })
  }



  ngOnInit() {
    this.getAllStocks()

  }
  ngOnDestroy(){
    
  }

}
