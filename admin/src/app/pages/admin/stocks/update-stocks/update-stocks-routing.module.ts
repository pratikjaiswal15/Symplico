import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateStocksComponent } from './update-stocks.component'

const routes: Routes = [
  {path : '' , component :UpdateStocksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateStocksRoutingModule { }
