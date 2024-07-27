import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VieweOneCategoryComponent } from './viewe-one-category.component'

const routes: Routes = [
  {path : '', component: VieweOneCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VieweOneCategoryRoutingModule { }
