import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';


const routes: Routes = [

  {
    path :'',
    redirectTo : 'items',
    pathMatch : 'full'

  },
  {
    path: '',
    component: MenuPage,
    children : [
      { path: 'items',  loadChildren: () => import('../items/items.module').then(m => m.ItemsPageModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) }, 
      { path: 'my-orders', loadChildren: () => import('../my-orders/my-orders.module').then(m => m.MyOrdersPageModule) },
      { path: 'terms', loadChildren: () => import('../terms/terms.module').then(m => m.TermsPageModule) },
      { path: 'privacy', loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyPageModule) },
      { path: 'aboutus', loadChildren: () => import('../aboutus/aboutus.module').then(m => m.AboutusPageModule) },

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
  declarations: [MenuPage]
})
export class MenuPageModule {}
