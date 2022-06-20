import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app.constant';
import { OrderRequest, OrderStatusRequest } from './model/order-request.model';
import { OrderResponse, OrderStatusResponse } from './model/order-response.model';

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

  public getOrderDetail(orderId: number): Observable<OrderResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.ORDER_DETAIL_API + orderId;
    return this.httpClient.get<OrderResponse>(this.url);
  }

  public getOrderStatus(orderId: number): Observable<OrderStatusResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.ORDER_STATUS_API + orderId;
    return this.httpClient.get<OrderStatusResponse>(this.url);
  }

  public updateOrderStatus(orderStatusRequest: OrderStatusRequest): Observable<OrderStatusResponse> {
    this.url = AppConstant.SERVER_URL + AppConstant.ORDER_STATUS_UPDATE_API;
    return this.httpClient.patch<OrderStatusResponse>(this.url, orderStatusRequest);
  }

  public getOrdersByUser(userEmailId: string): Observable<OrderResponse[]> {
    this.url = AppConstant.SERVER_URL + AppConstant.ORDERS_BY_USER_API + userEmailId;
    return this.httpClient.get<OrderResponse[]>(this.url);
  }
}
