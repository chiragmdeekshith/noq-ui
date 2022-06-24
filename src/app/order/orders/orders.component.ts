import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';
import { OrderResponse } from '../model/order-response.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderResponses!: OrderResponse[];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    if (!this.checkUserLoggedIn()) {
      console.log("Navigating to login.");
      this.router.navigate(['/login']);
    }
    let userEmailId = sessionStorage.getItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID)!;
    this.orderService.getOrdersByUser(userEmailId).subscribe(orderResponses => {
      this.orderResponses = orderResponses;
    });
  }

  public getUniqueRestaurantsFromOrderResponse(orderResponse: OrderResponse): string[] {
    let restaurantNames: Set<string> = new Set<string>();;
    for (let orderItemResponse of orderResponse.orderItemResponses) {
      restaurantNames.add(orderItemResponse.restaurantName);
    }
    return Array.from(restaurantNames.values());
  }

  public onClickOrder(orderId: number) {
    console.log("Routing to order status");
    this.router.navigate(['/order/status/' + orderId]);
  }

  private checkUserLoggedIn(): boolean {
    let loggedIn: string;
    loggedIn = sessionStorage.getItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID)!;
    if (loggedIn != null && loggedIn != undefined && loggedIn != "null" && loggedIn != "undefined") {
      return true;
    }
    return false;
  }

}
