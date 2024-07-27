import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistraionrRoutingModule } from './registraionr-routing.module';
import { RegistraionrComponent } from './registraionr.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistraionrComponent],
  imports: [
    CommonModule,
    RegistraionrRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistraionrModule { }
