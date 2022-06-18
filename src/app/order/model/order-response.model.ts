export interface OrderResponse {
    orderId: number;
    userEmailId: string;
    totalPrice: number;
    status: string;
    message: string;
    orderItems : OrderItem[];
}

interface OrderItem {
    orderItemId: number;
    orderId: number;
    itemId: number;
    quantity: number;
}