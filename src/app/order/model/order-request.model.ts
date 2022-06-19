export class OrderRequest {
    userEmailId!: string;
    orderItemRequests!: OrderItemRequest[];
}

export class OrderStatusRequest {
    orderId!: number;
    status!: string;
}

interface OrderItemRequest {
    itemId: number;
    quantity: number;
}