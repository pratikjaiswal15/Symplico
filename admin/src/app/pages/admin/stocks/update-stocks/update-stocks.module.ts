import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateStocksRoutingModule } from './update-stocks-routing.module';
import { UpdateStocksComponent } from './update-stocks.component'


@NgModule({
  declarations: [UpdateStocksComponent],
  imports: [
    CommonModule,
    UpdateStocksRoutingModule
  ]
})
export class UpdateStocksModule { }
