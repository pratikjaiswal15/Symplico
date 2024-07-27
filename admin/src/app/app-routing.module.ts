import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [

  {path : '' , redirectTo: 'login', pathMatch : 'full'},
  {path: 'login', loadChildren : () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {path: 'admin-dashboard',  canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule ) },
  {path : 'all-main-categoris' ,canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/main-category/main-category.module').then(m => m.MainCategoryModule) }, 
  {path : 'add-main-category', canActivate: [AuthGuard],loadChildren : () => import('./pages/admin/main-category/add-main-category/add-main-category.module').then(m => m.AddMainCategoryModule)},
  {path : 'view-one-main-category',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/main-category/view-one-main-category/view-one-main-category.module').then(m => m.ViewOneMainCategoryModule)},
  {path : 'update-one-main-category/:id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/main-category/update-main-category/update-main-category.module').then(m => m.UpdateMainCategoryModule)  },
  {path : 'all-categories',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/category/category.module').then(m => m.CategoryModule)},
  {path : 'add-category',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/category/add-category/add-category.module').then(m => m.AddCategoryModule)},
  {path : 'view-one-category' ,canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/category/viewe-one-category/viewe-one-category.module').then(m => m.VieweOneCategoryModule) },
  {path : 'update-one-category/:id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/category/update-category/update-category.module').then(m => m.UpdateCategoryModule)},
  {path : 'all-products',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/product/product.module').then(m => m.ProductModule)},
  {path : 'add-product',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/product/add-product/add-product.module').then(m => m.AddProductModule)},
  {path : 'view-one-product/:id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/product/view-product/view-product.module').then(m => m.ViewProductModule)},
  {path : 'update-one-product/:id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/product/update-product/update-product.module').then(m => m.UpdateProductModule)},
  {path : 'purchasing',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/purchase/purchase.module').then(m => m.PurchaseModule)},
  {path : 'view-all-purchase-orders',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/purchase/view-all-purchase/view-all-purchase.module').then(m => m.ViewAllPurchaseModule) },
  {path : 'view-stocks',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/stocks/stocks.module').then(m => m.StocksModule)},
  {path : 'updatestock/id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/stocks/update-stocks/update-stocks.module').then(m => m.UpdateStocksModule)},
  {path : 'stock-after-purchase',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/purchase-stocks/purchase-stocks.module').then(m => m.PurchaseStocksModule)},
  {path : 'update-stock-after-purchase/:id',canActivate: [AuthGuard],loadChildren : () => import('./pages/admin/purchase-stocks/update-purchase-stocks/update-purchase-stocks.module').then(m => m.UpdatePurchaseStocksModule) },
  {path : 'update-purchase/:id',canActivate: [AuthGuard], loadChildren : () => import('./pages/admin/purchase/update-purchase/update-purchase.module').then(m => m.UpdatePurchaseModule)},
  { path: 'orders',canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'change-product-price',canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/product/product-price/product-price.module').then(m => m.ProductPriceModule) },

  { path: 'past-orders', canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/orders/past-orders/past-orders.module').then(m => m.PastOrdersModule) },

  { path: 'seller-registration', canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/seller/registraionr/registraionr.module').then(m => m.RegistraionrModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
