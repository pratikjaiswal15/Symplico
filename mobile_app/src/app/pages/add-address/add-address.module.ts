import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AddAddressPage } from './add-address.page';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


const routes: Routes = [
  {
    path: '',
    component: AddAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [AddAddressPage],

  providers :[

    AndroidPermissions,
    LocationAccuracy,
    NativeGeocoder,

  ]
})
export class AddAddressPageModule {}
