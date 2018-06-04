import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../../message/service/message.service';
// import { decode } from 'jwt-decode';
// jwt-code de angular2-jwt (instalado com npm) não funcionou!

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public isLoggedIn = false;
  public currentUser = [];
  public permissionList = [];
  public redirectUrl: string;

  private authUrl = 'api/autenticar';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public getToken(): string {
    const tk = localStorage.getItem('x-token');
    // TODO mehor a forma de tratar os 'tokens'... 
    this.currentUser['name'] = localStorage.getItem('x-name');
    this.currentUser['email'] = localStorage.getItem('x-email');
    this.currentUser['role'] = localStorage.getItem('x-role');
    return  tk ? tk : '';
  }

  public isAuthenticated(): boolean {
    const tk = this.getToken();
    //console.log('auth.service.ts ----- isAuthenticaed() tk é ', tk);
    // TODO verificar se token está expirado
    return tk ? true : false;
  }

  public setPermissions(list: string) {
    localStorage.setItem('x-permissions', list);
    if(list)
      this.permissionList = list.split(',');
  }

  public getPermissionForRoute(url: string) {
    if (this.permissionList.length == 0) {
      this.permissionList = localStorage.getItem('x-permissions').split(',');
    }
    var ret = this.permissionList.find(
      el => {
        // procura a url a que será navegada na lista de permissões
        var t = (url.indexOf(el) == 0 || url.indexOf(el+'/') == 0)
        return t;
      }
    );
    //console.log('auth.service.js ----- getPermissions() return é '+ret+' ------>', this.permissionList);
    //console.log('auth.service.js ----- teste 1', this.permissionList.indexOf('/projeto'));
    return ret;
  }

  public login(model: any): Observable<any> {
    const pair = model;
    //return this.http.post(this.authUrl, model);
    return this.http.post<any>(this.authUrl, pair).pipe(
      tap(
        (obj) => {
          //console.log('auth.service.ts ----- to aqui no login', obj);
          //this.isLoggedIn = true;
          const tk = obj['x-access-token'];
          localStorage.setItem('x-token', tk);
          localStorage.setItem('x-name', obj['x-user-name']);
          localStorage.setItem('x-email', obj['x-user-email']);
          localStorage.setItem('x-role', obj['x-user-role']);
          this.currentUser['name'] = obj['x-user-name'];
          this.currentUser['email'] = obj['x-user-email'];
          this.currentUser['role'] = obj['x-user-role'];
        }
      ),
      catchError(this.handleError<any>('login'))
    );
  }

  public logout() {
    //this.isLoggedIn = false;
    //console.log('auth.service.ts ----- logout');
    localStorage.removeItem('x-token');
    localStorage.removeItem('x-permissions');
    localStorage.removeItem('x-name');
    localStorage.removeItem('x-email');
    localStorage.removeItem('x-role');
    this.currentUser = [];
  }

  private handleError<T>(operation = 'Operação', result?: T) {
    return (error: any): Observable<T> => {
      console.error('handleError em auth.service', error);
      if (error.error)
        this.messageService.error(error.error.message, true);
      else
        this.messageService.error('Erro indefinido. [aut.serv.'+operation+']', true);
      // retorna um resultado vazio para app continuar rodando
      return of(result as T);
    };
  }
}
