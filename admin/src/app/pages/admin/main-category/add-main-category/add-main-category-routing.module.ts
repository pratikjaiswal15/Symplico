import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMainCategoryComponent } from './add-main-category.component'

const routes: Routes = [
  {path : '', component : AddMainCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMainCategoryRoutingModule { }
