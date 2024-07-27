import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastOrdersComponent } from './past-orders.component';

const routes: Routes = [{ path: '', component: PastOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastOrdersRoutingModule { }
