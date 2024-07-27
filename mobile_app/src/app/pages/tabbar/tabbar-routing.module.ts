import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabbarPage } from './tabbar.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabbarPage,
    children : [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then( m => m.Tab2PageModule)
      },

      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then( m => m.Tab3PageModule)
      },

      {
        path: 'tab4',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },

      {
        path: 'tab5',
        loadChildren: () => import('../carts/carts.module').then( m => m.CartsPageModule),
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabbarPageRoutingModule {}
