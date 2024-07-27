import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseStocksRoutingModule } from './purchase-stocks-routing.module';
import { PurchaseStocksComponent } from './purchase-stocks.component'
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [PurchaseStocksComponent],
  imports: [
    CommonModule,
    PurchaseStocksRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class PurchaseStocksModule { }
