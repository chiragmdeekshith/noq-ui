import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constant';
import { RestaurantDetailResponse, RestaurantListResponse } from './model/restaurant-response.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url!: string;

  constructor(private httpClient: HttpClient) { }

  public getRestaurantList(): Observable<RestaurantListResponse[]> {
    this.url = AppConstant.SERVER_URL + AppConstant.RESTAURANT_LIST_API;
    return this.httpClient.get<RestaurantListResponse[]>(this.url);
  }

  public getRestaurantDetail(restaurantId: number): Observable<RestaurantDetailResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.RESTAURANT_DETAIL_API + restaurantId;
    return this.httpClient.get<RestaurantDetailResponse>(this.url);
  }

}
