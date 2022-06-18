export class OrderRequest {
    userEmailId!: string;
    orderItems!: OrderItem[];
}

interface OrderItem {
    itemId: number;
    quantity: number;
}