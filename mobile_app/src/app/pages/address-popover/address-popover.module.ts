import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPopoverPage } from './address-popover.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [AddressPopoverPage],
  entryComponents: [AddressPopoverPage]
})
export class AddressPopoverPageModule {}
