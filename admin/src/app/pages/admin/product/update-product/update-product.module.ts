import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectFilterModule } from 'mat-select-filter';




@NgModule({
  declarations: [UpdateProductComponent],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectFilterModule
  ],
  exports : [
    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class UpdateProductModule { }
