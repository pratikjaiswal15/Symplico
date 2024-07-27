import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainCategoryRoutingModule } from './main-category-routing.module';
import { MainCategoryComponent } from './main-category.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [MainCategoryComponent],
  imports: [
    CommonModule,
    MainCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],

})
export class MainCategoryModule { }
