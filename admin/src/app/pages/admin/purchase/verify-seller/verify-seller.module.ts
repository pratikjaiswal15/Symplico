import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { VerifySellerComponent } from './verify-seller.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SnackbarModule } from '../snackbar/snackbar.module'
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [VerifySellerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SnackbarModule,
    MatSnackBarModule
  ],
  exports :[ 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule 
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class VerifySellerModule { }
