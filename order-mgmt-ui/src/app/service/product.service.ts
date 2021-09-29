import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response, Responses } from 'src/app/shared/model/response';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/model/product';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    baseUrl = environment.apiUrl + 'products';

    public cart$: BehaviorSubject<Product[] | null> = new BehaviorSubject<Product[] | null>(null);

    constructor(private http: HttpClient) { }

    addToCart(product: Product): void {
        if (this.cart$ && this.cart$.value) {
            const products = this.cart$.value;
            products.push(product);
            this.cart$.next(products);
        } else {
            const products: Product[] = [];
            products.push(product);
            this.cart$.next(products);
        }
    }

    getCart(): any {
        return this.cart$.value;
    }

    fetchAllProducts(): Observable<Responses<Product>> {
        const url = this.baseUrl;
        return this.http.get<Responses<Product>>(url).pipe(map(p => {
            return p;
        }));
    }

}
