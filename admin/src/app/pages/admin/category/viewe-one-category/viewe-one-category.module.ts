import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VieweOneCategoryRoutingModule } from './viewe-one-category-routing.module';
import { VieweOneCategoryComponent } from './viewe-one-category.component'


@NgModule({
  declarations: [VieweOneCategoryComponent],
  imports: [
    CommonModule,
    VieweOneCategoryRoutingModule
  ]
})
export class VieweOneCategoryModule { }
