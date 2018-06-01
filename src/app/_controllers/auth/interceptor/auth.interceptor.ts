import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const serverUrl = 'http://localhost:3000/';

    request = request.clone({

      setHeaders: {
        observe: 'response',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.getToken()}`,
        'x-access-token': `${this.auth.getToken()}`
      },
      url: serverUrl + request.url,
      
    });

    /*
    'Content-Type': 'application/json'
    'Content-Type': 'x-www-form-urlencoded'
    'Content-Type': 'form-data'
    if POST change to: application/x-www-form-urlencoded
    };*/

    return next.handle(request);
  }
}
