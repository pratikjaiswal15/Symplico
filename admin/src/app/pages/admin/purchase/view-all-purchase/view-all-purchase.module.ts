import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAllPurchaseRoutingModule } from './view-all-purchase-routing.module';
import { ViewAllPurchaseComponent } from './view-all-purchase.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [ViewAllPurchaseComponent],
  imports: [
    CommonModule,
    ViewAllPurchaseRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    InfiniteScrollModule,
    MatListModule
  ],
  exports : [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ViewAllPurchaseModule { }
