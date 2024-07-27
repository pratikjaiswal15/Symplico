import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistraionrComponent } from './registraionr.component';

const routes: Routes = [{ path: '', component: RegistraionrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistraionrRoutingModule { }
