export class OrderItem {
    public productId!: number;
    public qty!: number;
    public price!: number;
}

export interface Order {
    id: number;
    userId: number;
    orderItems: OrderItem[];
    totalPrice: number;
    status: string;
}
