import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOneMainCategoryComponent } from './view-one-main-category.component'

const routes: Routes = [
  {path : '', component: ViewOneMainCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOneMainCategoryRoutingModule { }
