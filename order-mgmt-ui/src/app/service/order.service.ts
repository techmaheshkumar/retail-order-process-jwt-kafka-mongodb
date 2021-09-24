import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    baseUrl = environment.apiUrl + 'orders';

    constructor(private http: HttpClient) { }

    addToOrder(value: Order): Observable<any> {
        const url = this.baseUrl;
        return this.http.post<any>(url, value);
    }
    getAllOrder(userId: string): Observable<Response<Order>> {
        const url = this.baseUrl + '/orders/' + userId;
        return this.http.get<Response<Order>>(url);
    }
}