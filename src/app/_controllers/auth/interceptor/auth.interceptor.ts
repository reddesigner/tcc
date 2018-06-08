import { Injectable } from '@angular/core';

import { finalize, tap } from 'rxjs/operators'

import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    let ok: string;

    //const serverUrl = 'http://localhost:3000/';
    //const serverUrl = 'http://localhost:4200/';
    const serverUrl = 'http://ec2-18-228-31-157.sa-east-1.compute.amazonaws.com:4200/';

    request = request.clone({

      setHeaders: {
        'observe': 'response',
        'content-type': 'application/json',
        'authorization': `Bearer ${this.auth.getToken()}`,
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

    // return next.handle(request);

    return next.handle(request)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => { 
            ok = event instanceof HttpResponse ? 'sucesso' : ''; 
            //console.log('auth.interceptor.ts ----- evento sucesso ', event);
            if (event['headers']) {
              //console.log('------------------------ --------------------- --------------------');
              //console.log('auth.interceptor.ts -----', event['headers'].getAll('X-Powered-By'));
              //console.log('auth.interceptor.ts -----', event['headers'].getAll('x-permissions'));
              //console.log('auth.interceptor.ts -----', event['headers'].getAll('x-refresh'));
              //console.log('------------------------ --------------------- --------------------');
              // envia as permissões para serviço de autenticação
              if (event['headers'].get('x-permissions'))
                this.auth.setPermissions(event['headers'].get('x-permissions'));
              if (event['headers'].get('x-refresh'))
                this.auth.setToken(event['headers'].get('x-refresh'));
            }
          },
          // Operation failed; error is an HttpErrorResponse
          error => { 
            ok = 'falhou';
            console.error('auth.interceptor.ts ----- evento error', error); // se der erro, tipo 400, passa aqui com a msg... ler msg e decidir o que fazer...
            if (error.message && error.message == 'Http failure response for (unknown url): 0 Unknown Error') {
              //
              error.error.message = "Erro desconhecido";
              error.error.type = "error";
              //console.error('auth.interceptor.ts ----- erro desconhecido... servidor inativo?...');
            }
            if (error.body && error.body.action == 'logout') {
              // do logout
              //console.error('auth.interceptor.ts ----- servidor manda ação customizada de logout');
            }
            if (error.error && error.error.type == 'error') {
              //console.error('auth.interceptor.ts ----- Mensagem do servidor: ' + error.error.message);
            }
          }
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}" ${ok} em ${elapsed} ms.`;
          //console.log('auth.interceptor.ts ----- HTTP Response: ' + msg + ' | objeto Request:', request);
        })
      );

  }
}
