import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePurchaseComponent } from './update-purchase.component'

const routes: Routes = [
  {path : '' , component : UpdatePurchaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePurchaseRoutingModule { }
