import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateMainCategoryRoutingModule } from './update-main-category-routing.module';
import { UpdateMainCategoryComponent } from './update-main-category.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpdateMainCategoryComponent],
  imports: [
    CommonModule,
    UpdateMainCategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateMainCategoryModule { }
