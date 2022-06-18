export class OrderRequest {
    userEmailId!: string;
    orderItems!: OrderItem[];
}

export class OrderStatusRequest {
    orderId!: number;
    status!: string;
}

interface OrderItem {
    itemId: number;
    quantity: number;
}