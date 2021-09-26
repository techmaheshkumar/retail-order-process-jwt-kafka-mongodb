import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../shared/model/user';
import { environment } from 'src/environments/environment';
import { Response } from '../shared/model/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  baseUrl = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.baseUrl + '/signin', payload);
  }

  create(payload: any): Observable<Response<string>> {
    return this.http.put<Response<string>>(this.baseUrl + '/signup', payload);
  }

}
