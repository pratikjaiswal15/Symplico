import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CartsPage } from './carts.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressModalPageModule } from '../address-modal/address-modal.module';


const routes: Routes = [

  { path: '', redirectTo: 'tab5', pathMatch: 'full' },

  {
    path: '', children:[

      { path :'', component : CartsPage },

      { path: 'add-address', loadChildren: () => import('../add-address/add-address.module').then(m => m.AddAddressPageModule) },
      { path : 'payment-options', loadChildren : () => import('../payment-options/payment-options.module').then(m => m.PaymentOptionsPageModule)}
  
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule, 
    AddressModalPageModule,  

  ],
  declarations: [CartsPage ], 
  
})
export class CartsPageModule {}
