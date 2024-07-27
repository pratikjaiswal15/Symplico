import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMainCategoryRoutingModule } from './add-main-category-routing.module';
import { AddMainCategoryComponent } from './add-main-category.component'
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddMainCategoryComponent],
  imports: [
    CommonModule,
    AddMainCategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddMainCategoryModule { }
