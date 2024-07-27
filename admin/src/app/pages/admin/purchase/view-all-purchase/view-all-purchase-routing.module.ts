import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllPurchaseComponent } from './view-all-purchase.component'

const routes: Routes = [
  {path : '' , component : ViewAllPurchaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllPurchaseRoutingModule { }
