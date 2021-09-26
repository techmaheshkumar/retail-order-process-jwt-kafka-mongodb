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

    public cart$: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>(null);

    constructor(private http: HttpClient) { }

    fetchAllProducts(): Observable<Responses<Product>> {
        const url = this.baseUrl;
        return this.http.get<Responses<Product>>(url).pipe(map(p => {
            // p.result.forEach(p1 => {
            //    // p1._cartQty = 1;
            //   //  p1.inCart = false;
            // });
            return p;
        }));
    }

}
