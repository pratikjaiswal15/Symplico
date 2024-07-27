import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePurchaseStocksComponent } from './update-purchase-stocks.component'

const routes: Routes = [
  {path : ''  , component : UpdatePurchaseStocksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePurchaseStocksRoutingModule { }
