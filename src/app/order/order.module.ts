import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { StatusComponent } from './status/status.component';



@NgModule({
  declarations: [
    CartComponent,
    StatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
