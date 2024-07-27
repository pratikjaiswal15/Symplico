import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOneMainCategoryRoutingModule } from './view-one-main-category-routing.module';
import { ViewOneMainCategoryComponent } from './view-one-main-category.component'


@NgModule({
  declarations: [ViewOneMainCategoryComponent],
  imports: [
    CommonModule,
    ViewOneMainCategoryRoutingModule
  ]
})
export class ViewOneMainCategoryModule { }
