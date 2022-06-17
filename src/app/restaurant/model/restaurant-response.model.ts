export interface RestaurantListResponse {
    restaurantId: number;
    name: string;
    imageUrl: string;
}

export interface RestaurantDetailResponse {
    restaurantName: string;
    message: string;
    items: Item[];
}

interface Item{
    itemId: number;
    restaurantId: number;
    name: string;
    price: number;
    imageUrl: string;
}
    