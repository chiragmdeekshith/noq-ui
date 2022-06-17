import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { StatusComponent } from './status/status.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CartComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CartComponent
  ]
})
export class OrderModule { }
