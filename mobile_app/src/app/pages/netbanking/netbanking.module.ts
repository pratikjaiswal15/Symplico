import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NetbankingPage } from './netbanking.page';

const routes: Routes = [
  {
    path: '', redirectTo : 'netbanking', pathMatch:'full'
  },
  {
    path : '',
    children: [
       {
         path : '', component : NetbankingPage
       },
      {

          path: 'order-success',
          loadChildren: () => import('../order-success/order-success.module').then(m => m.OrderSuccessPageModule)
      }
    ]

  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NetbankingPage]
})
export class NetbankingPageModule {}
