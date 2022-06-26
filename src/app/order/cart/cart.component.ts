import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';
import { CartItem } from '../model/cart-item.model';
import { OrderRequest } from '../model/order-request.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  restaurants!: Set<string>;
  totalPrice!: number;

  constructor(private router: Router, private orderService: OrderService) {
    this.restaurants = new Set<string>;
  }

  ngOnInit(): void {
    const cartItemsTest = localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS);
    this.cartItems = cartItemsTest !== null && cartItemsTest !== undefined && cartItemsTest !== "undefined" ?
      JSON.parse(cartItemsTest) : [];
    this.updateRestaurantList(this.cartItems);
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));
  }

  public payAndPlaceOrder() {

    let userEmailId: string = sessionStorage.getItem(AppConstant.SESSION_STORAGE_USER_EMAIL_ID)!;
    if (userEmailId == null || userEmailId == undefined || userEmailId == "" || userEmailId == "undefined" || userEmailId == "null") {
      console.log("Navigating to login");
      this.router.navigate(['/login']);
    }

    else {
      let orderRequest: OrderRequest = new OrderRequest();
      orderRequest.userEmailId = userEmailId;
      orderRequest.orderItemRequests = [];
      for (let cartItem of this.cartItems) {
        orderRequest.orderItemRequests.push({
          itemId: cartItem.itemId,
          quantity: cartItem.quantity
        });
      }
      this.orderService.newOrder(orderRequest).subscribe(orderResponse => {
        console.log(orderResponse);
        this.cartItems = [];
        this.updateRestaurantList(this.cartItems);
        localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));

        console.log("Navigating to order " + orderResponse.orderId);
        this.router.navigate(['/order/status/' + orderResponse.orderId]);
      });
    }
  }

  public calculateTotalPrice(): number {
    let total: number = 0;
    for (let cartItem of this.cartItems) {
      total += cartItem.price * cartItem.quantity;
    }
    return total;
  }

  public onClickPlus(itemId: number) {
    this.cartItems = JSON.parse(localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS)!);
    this.updateRestaurantList(this.cartItems);
    for (let cartItem of this.cartItems) {
      if (itemId == cartItem.itemId) {
        cartItem.quantity += 1;
        break;
      }
    }
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));
    console.log('Added item ' + itemId);
  }

  public onClickMinus(itemId: number) {

    this.cartItems = JSON.parse(localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS)!);
    this.updateRestaurantList(this.cartItems);
    let isRemoved: boolean = false;
    for (let cartItem of this.cartItems) {
      if (itemId == cartItem.itemId) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          isRemoved = true;
        }
        else {
          isRemoved = false;
        }
        break;
      }
    }
    if (!isRemoved) {
      this.cartItems = this.cartItems.filter(cartItem => {
        return cartItem.itemId != itemId;
      });
      this.updateRestaurantList(this.cartItems);
    }
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));
    console.log('Removed item ' + itemId);
  }

  public isCartEmpty(): boolean {
    if (this.cartItems != null && this.cartItems != undefined) {
      return this.cartItems.length == 0;
    }
    return false;
  }

  public onClickRestaurants() {
    console.log("Navigating to restaurants");
    this.router.navigate(['/restaurants']);
  }


  public getRestaurantNames(): string[] {
    return Array.from(this.restaurants.values());
  }

  private updateRestaurantList(cartItems: CartItem[]): void {
    this.restaurants.clear();
    for (let cartItem of cartItems) {
      this.restaurants.add(cartItem.restaurantName);
    }
  }

}

