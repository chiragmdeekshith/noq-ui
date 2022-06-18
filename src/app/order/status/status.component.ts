import { Component, Input, OnInit } from '@angular/core';
import { StatusConstant } from '../constant/status.constant';
import { CartItem } from '../model/cart-item.model';
import { OrderStatusRequest } from '../model/order-request.model';
import { OrderResponse } from '../model/order-response.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input()
  orderId!: number;
  orderResponse!: OrderResponse;
  orderItems!: CartItem[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderItems = JSON.parse(localStorage.getItem("orderItems")!);
    this.orderService.getOrderDetail(this.orderId).subscribe(orderResponse => {
      this.orderResponse = orderResponse;
      this.startMonitoringOrderStatus();
    });
  }

  public isReadyForPickup(): boolean {
    if (this.orderResponse.status == StatusConstant.READY_FOR_PICKUP) {
      return true;
    }
    return false;
  }

  public isCancellable(): boolean {
    if(this.orderResponse.status == StatusConstant.IN_PROGRESS){
      return true;
    }
    return false;
  }

  public onClickPickUp(): void {
    let orderStatusRequest = new OrderStatusRequest();
    orderStatusRequest.orderId = this.orderId;
    orderStatusRequest.status = StatusConstant.COMPLETED;
    this.orderService.updateOrderStatus(orderStatusRequest).subscribe(orderStatusResponse => {
      this.orderResponse.status = orderStatusResponse.status;
      localStorage.setItem("orderItems", "[]");
      console.log('Order ' + orderStatusResponse.orderId + ' picked up');
    });
  }

  public onClickCancel(): void {
    let orderStatusRequest = new OrderStatusRequest();
    orderStatusRequest.orderId = this.orderId;
    orderStatusRequest.status = StatusConstant.CANCELLED;
    this.orderService.updateOrderStatus(orderStatusRequest).subscribe(orderStatusResponse => {
      this.orderResponse.status = orderStatusResponse.status;
      localStorage.setItem("orderItems", "[]");
      console.log('Order ' + orderStatusResponse.orderId + ' cancelled');
    });
  }

  private startMonitoringOrderStatus() {
    console.log("Checking order status");
    setTimeout(() => {
      this.orderService.getOrderStatus(this.orderId).subscribe(orderStatusResponse => {
        this.orderResponse.status = orderStatusResponse.status;
        if (this.orderResponse.status == StatusConstant.IN_PROGRESS) {
          this.startMonitoringOrderStatus();
        }
      });
    }, 5000);
  }
}
