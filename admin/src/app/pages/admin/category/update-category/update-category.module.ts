import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCategoryRoutingModule } from './update-category-routing.module';
import { UpdateCategoryComponent } from './update-category.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateCategoryComponent],
  imports: [
    CommonModule,
    UpdateCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateCategoryModule { }
