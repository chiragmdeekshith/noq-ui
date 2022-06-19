export interface OrderResponse {
    orderId: number;
    userEmailId: string;
    totalPrice: number;
    status: string;
    message: string;
    orderItemResponses : OrderItemResponse[];
}

export interface OrderStatusResponse {
    orderId: number;
    status: string;
}

interface OrderItemResponse {
    orderItemId: number;
    itemId: number;
    itemName: string;
    restaurantId: number;
    restaurantName: string;
    quantity: number;
    itemPrice: number;
    totalPrice: number;
}