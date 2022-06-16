import { Component, Input, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { RestaurantDetailResponse } from '../model/restaurant-response.model';

@Component({
  selector: 'restaurant-detail',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input()
  restaurantId!: number;
  restaurantDetail!: RestaurantDetailResponse;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurantDetail(this.restaurantId);
  }

  private getRestaurantDetail(restaurantId: number){
    this.restaurantService.getRestaurantDetail(restaurantId).subscribe(restaurantDetail => {
      console.log(restaurantDetail);
      this.restaurantDetail = restaurantDetail;
    });
  }

  public onClickMinus(itemId: number){
    console.log('Remove item '+ itemId);
  }

  public onClickPlus(itemId: number){
    console.log('Add item '+ itemId);
  }

}
