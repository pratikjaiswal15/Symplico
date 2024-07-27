import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePurchaseRoutingModule } from './update-purchase-routing.module';
import { UpdatePurchaseComponent } from './update-purchase.component'
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UpdatePurchaseComponent],
  imports: [
    CommonModule,
    UpdatePurchaseRoutingModule,
    ReactiveFormsModule,
  ],



})
export class UpdatePurchaseModule { }
