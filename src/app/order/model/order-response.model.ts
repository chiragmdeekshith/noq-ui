export interface OrderResponse {
    orderId: number;
    userEmailId: string;
    totalPrice: number;
    status: string;
    message: string;
    orderItems : OrderItem[];
}

export interface OrderStatusResponse {
    orderId: number;
    status: string;
}

interface OrderItem {
    orderItemId: number;
    orderId: number;
    itemId: number;
    quantity: number;
}