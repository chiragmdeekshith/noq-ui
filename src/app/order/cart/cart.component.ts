import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  totalPrice!: number;
  displayedColumns: string[] = ['restaurantName', 'name', 'price', 'quantity', 'totalPrice'];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    const cartItemsTest = localStorage.getItem("cartItems");
    this.cartItems = cartItemsTest !== null && cartItemsTest !== undefined && cartItemsTest !== "undefined" ?
      JSON.parse(cartItemsTest) : [];
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  public payAndPlaceOrder() {

    let userEmailId: string = localStorage.getItem("userEmailId")!;
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
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));

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
    this.cartItems = JSON.parse(localStorage.getItem("cartItems")!);
    for (let cartItem of this.cartItems) {
      if (itemId == cartItem.itemId) {
        cartItem.quantity += 1;
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    console.log('Added item ' + itemId);
  }

  public onClickMinus(itemId: number) {

    this.cartItems = JSON.parse(localStorage.getItem("cartItems")!);
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
    }
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    console.log('Removed item ' + itemId);
  }

}
