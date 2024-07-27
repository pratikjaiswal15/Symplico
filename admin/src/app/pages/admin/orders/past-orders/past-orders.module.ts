import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PastOrdersRoutingModule } from './past-orders-routing.module';
import { PastOrdersComponent } from './past-orders.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [PastOrdersComponent],
  imports: [
    CommonModule,
    PastOrdersRoutingModule,
    InfiniteScrollModule,
    MatExpansionModule,
    MatCheckboxModule
  ]
})
export class PastOrdersModule { }
