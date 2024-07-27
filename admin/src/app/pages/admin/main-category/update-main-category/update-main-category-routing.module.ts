import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateMainCategoryComponent } from './update-main-category.component'

const routes: Routes = [
  {path : '', component : UpdateMainCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateMainCategoryRoutingModule { }
