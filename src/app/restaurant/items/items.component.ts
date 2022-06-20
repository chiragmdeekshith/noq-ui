import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { RestaurantDetailResponse } from '../model/restaurant-response.model';
import { CartItem } from '../../order/model/cart-item.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: 'restaurant-detail',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  restaurantId!: number;
  restaurantDetail!: RestaurantDetailResponse;
  cartItems!: CartItem[];

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    const cartItemsTest = localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS);
    this.cartItems = cartItemsTest !== null && cartItemsTest !== undefined && cartItemsTest !== "undefined" ?
      JSON.parse(cartItemsTest) : [];
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));

    this.route.paramMap.subscribe(params =>{
      this.restaurantId = Number(params.get('restaurantId'))
      this.getRestaurantDetail(this.restaurantId);
    });
  }

  private getRestaurantDetail(restaurantId: number) {
    this.restaurantService.getRestaurantDetail(restaurantId).subscribe(restaurantDetail => {
      console.log(restaurantDetail);
      this.restaurantDetail = restaurantDetail;
    });
  }

  public onClickMinus(itemId: number) {

    this.cartItems = JSON.parse(localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS)!);
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
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));
    console.log('Removed item ' + itemId);
  }

  public onClickPlus(itemId: number, itemName: string, itemPrice: number, restaurantName: string) {

    this.cartItems = JSON.parse(localStorage.getItem(AppConstant.LOCAL_STORAGE_CART_ITEMS)!);
    let isAdded: boolean = false;
    for (let cartItem of this.cartItems) {
      if (itemId == cartItem.itemId) {
        cartItem.quantity += 1;
        isAdded = true;
        break;
      }
    }
    if (!isAdded) {
      let cartItem: CartItem = {
        itemId: itemId,
        name: itemName,
        restaurantName: restaurantName,
        price: itemPrice,
        quantity: 1
      }
      this.cartItems.push(cartItem);
    }
    localStorage.setItem(AppConstant.LOCAL_STORAGE_CART_ITEMS, JSON.stringify(this.cartItems));
    console.log('Added item ' + itemId);
  }

  public getQuantity(itemId: number): number {

    for (let cartItem of this.cartItems) {
      if (itemId == cartItem.itemId) {
        return cartItem.quantity;
      }
    }
    return 0;
  }

}
