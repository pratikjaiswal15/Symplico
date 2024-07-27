import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCategoryComponent } from './main-category.component'

const routes: Routes = [
  {path : '', component : MainCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainCategoryRoutingModule { }
