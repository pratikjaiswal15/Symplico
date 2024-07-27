import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component'
import {MatDialogModule} from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports : [
    MatDialogModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]

})
export class ConfirmDialogModule { }
