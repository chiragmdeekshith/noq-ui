import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cart-item.model';

@Component({
  selector: 'order-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  displayedColumns: string[] = ['restaurantName', 'name', 'price', 'quantity', 'totalPrice'];

  constructor() { }

  ngOnInit(): void {
    const cartItemsTest = localStorage.getItem("cartItems");
    this.cartItems = cartItemsTest !== null && cartItemsTest !== undefined && cartItemsTest !== "undefined" ?
      JSON.parse(cartItemsTest) : [];
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

}
