import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePurchaseStocksRoutingModule } from './update-purchase-stocks-routing.module';
import { UpdatePurchaseStocksComponent } from './update-purchase-stocks.component'


@NgModule({
  declarations: [UpdatePurchaseStocksComponent],
  imports: [
    CommonModule,
    UpdatePurchaseStocksRoutingModule
  ]
})
export class UpdatePurchaseStocksModule { }
