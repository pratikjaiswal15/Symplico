import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component'
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [StocksComponent],
  imports: [
    CommonModule,
    StocksRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class StocksModule { }
