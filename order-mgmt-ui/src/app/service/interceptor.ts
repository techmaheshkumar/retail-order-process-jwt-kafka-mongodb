import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');
    if (token) {
      // console.log('token : ' + token);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request).pipe(
      // catch((err: any, caught) => {
      //   if (err instanceof HttpErrorResponse) {
      //     if (err.status === 403) {
      //       console.info('err.error =', err.error, ';');
      //     }
      //     return Observable.throw(err);
      //   }
      // })
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.router.navigateByUrl("/login");
          }
        }
        return Observable.throw(err);
      })
    );


  }
}
