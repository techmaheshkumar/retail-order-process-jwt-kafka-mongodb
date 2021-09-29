import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../shared/model/order';
import { Responses } from '../shared/model/response';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    baseUrl = environment.apiUrl + 'orders';

    constructor(private http: HttpClient) { }

    placeOrder(value: Order): Observable<any> {
        return this.http.put<any>(this.baseUrl, value);
    }

    getOrders(userId: string): Observable<Responses<Order>> {
        const url = this.baseUrl + '/' + userId;
        return this.http.get<Responses<Order>>(url);
    }
}
