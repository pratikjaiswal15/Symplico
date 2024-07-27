import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentOptionsPage } from './payment-options.page';
import { RecaptchaModule } from 'ng-recaptcha';


const routes: Routes = [
  {
    path: '', redirectTo: 'payment-options', pathMatch: 'full'
  }, 
  {
    path : '' , children : [
      { path :'', component : PaymentOptionsPage },

      { path: 'card', loadChildren: () => import('../card/card.module').then(m => m.CardPageModule) },
      { path: 'netbanking', loadChildren: () => import('../netbanking/netbanking.module').then(m => m.NetbankingPageModule) },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecaptchaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentOptionsPage]
})
export class PaymentOptionsPageModule {}
