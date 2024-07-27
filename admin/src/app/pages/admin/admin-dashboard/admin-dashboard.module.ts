import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatBadgeModule,
    MatButtonModule    
  ],
  exports : [
    MatBadgeModule,
    MatButtonModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminDashboardModule { }
