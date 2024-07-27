import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressModalPage } from './address-modal.page';
import { AddressPopoverPageModule } from '../address-popover/address-popover.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressPopoverPageModule
  ],
  declarations: [AddressModalPage],
  entryComponents:[AddressModalPage]
})
export class AddressModalPageModule {}
