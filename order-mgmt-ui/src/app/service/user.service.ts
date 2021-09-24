import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../shared/model/user';
import { environment } from 'src/environments/environment';
import { ResponseSingle } from '../shared/model/response';
import { Response } from '../shared/model/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$:BehaviorSubject<User | null >=new BehaviorSubject<User | null>(null);

  baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<ResponseSingle<User>> {
    return this.http.post<ResponseSingle<User>>(this.baseUrl + '/login', payload);
  }

  create(payload: FormData): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.baseUrl, payload);
  }

  fetch(): Observable<Response<User>> {
    return this.http.get<Response<User>>(this.baseUrl);
  }

}
