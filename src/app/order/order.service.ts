import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constant';
import { OrderRequest } from './model/order-request.model';
import { OrderResponse } from './model/order-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url!: string;
  constructor(private httpClient: HttpClient) { }

  public newOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.NEW_ORDER_API;
    return this.httpClient.post<OrderResponse>(this.url, orderRequest);
  }
}
