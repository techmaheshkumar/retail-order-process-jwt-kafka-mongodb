import { Product } from './product';

export class Cart {
    public id!: number;
    public qty!: number;
    public userId!: number;
    public product!: Product;
}
