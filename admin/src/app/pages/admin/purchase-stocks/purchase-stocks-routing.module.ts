import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseStocksComponent } from './purchase-stocks.component'

const routes: Routes = [
  {path : '' , component : PurchaseStocksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseStocksRoutingModule { }
