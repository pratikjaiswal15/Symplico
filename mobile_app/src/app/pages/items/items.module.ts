import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemsPage } from './items.page';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
 
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  {
    path: '', children:[

      { path :'', component : ItemsPage },

   //   { path: 'carts', loadChildren: () => import('../carts/carts.module').then(m => m.CartsPageModule) },

  
    ]
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
  declarations: [ItemsPage]
})
export class ItemsPageModule {}
