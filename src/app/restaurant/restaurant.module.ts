import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
  
    RestaurantsComponent,
       ItemsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RestaurantModule { }
