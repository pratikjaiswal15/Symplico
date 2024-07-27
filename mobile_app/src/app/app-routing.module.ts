import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserTypeGuard } from './guards/user-type.guard'

const routes: Routes = [
  //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },

  { path: 'user-type', loadChildren: () => import('./pages/user-type/user-type.module').then(m => m.UserTypePageModule) },

 // { path: 'menu', /*canActivate: [AuthGuard],*/ loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule) },
  {
    path: '', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabbar/tabbar.module').then( m => m.TabbarPageModule)
  },

  {
    path: 'order-success',
    loadChildren: () => import('./pages/order-success/order-success.module').then(m => m.OrderSuccessPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//com.farm.fork