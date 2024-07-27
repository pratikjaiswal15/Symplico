import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component'
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
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
export class AddProductModule { }
