import { OrderItem } from './order-item';

export class Order {
    public id!: string;
    public userId!: string;
    public orderItems!: OrderItem[];
    public totalPrice!: number;
    public status!: string;
    public date: Date = new Date();
}
