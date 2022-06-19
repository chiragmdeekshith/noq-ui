import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { RestaurantListResponse } from '../model/restaurant-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'restaurant-list',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants! : RestaurantListResponse[]; 

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurantList();
  }

  private getRestaurantList(){
    this.restaurantService.getRestaurantList().subscribe(restaurants => {
      console.log(restaurants);
      this.restaurants = restaurants;
    });
  }

  public onClickRestaurant(restaurantId : number){
    console.log("Navigating to restaurant " + restaurantId);
    this.router.navigate(['/restaurant/'+restaurantId]);
  }

}
