import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { StatusComponent } from './status/status.component';
import { MaterialModule } from '../material/material.module';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    CartComponent,
    StatusComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CartComponent,
    StatusComponent,
    OrdersComponent
  ]
})
export class OrderModule { }
