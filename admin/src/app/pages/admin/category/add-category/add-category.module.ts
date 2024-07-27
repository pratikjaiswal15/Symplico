import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component'
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [AddCategoryComponent],
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatSelectFilterModule
    
  ],
  exports : [
    MatSelectModule,
    MatDividerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AddCategoryModule { }
