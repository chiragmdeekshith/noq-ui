import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './noq-common/page-not-found/page-not-found.component';
import { CartComponent } from './order/cart/cart.component';
import { OrdersComponent } from './order/orders/orders.component';
import { StatusComponent } from './order/status/status.component';
import { ItemsComponent } from './restaurant/items/items.component';
import { RestaurantsComponent } from './restaurant/restaurants/restaurants.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'home', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurant/:restaurantId', component: ItemsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order/:orderId', component: StatusComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
