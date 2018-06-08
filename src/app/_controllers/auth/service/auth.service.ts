import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { MessageService } from '../../message/service/message.service';
// import { decode } from 'jwt-decode';
// jwt-code de angular2-jwt (instalado com npm) não funcionou!

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public isLoggedIn = false;
  public currenToken: string;
  public currentUser = [];
  public permissionList = [];
  public redirectUrl: string;

  public timer;

  private authUrl = 'api/autenticar';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  // descodifica o token (JWT)
  public parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  // verifica a data EXP do token com data local atual
  public isExpired(token: any) {
    // TODO este modelo está comparando data do servidor com data local... 
    // deve haver um jeito melhor... creio que é preciso grava a data de quando o token é recebido...
    //console.log('auth.service.ts --------------------------', token.exp);
    if (new Date().getTime() > (token.exp * 1000)) {
      //console.log('auth.service.ts -----------------------------------------> token expirado!', new Date().getTime() - (token.exp * 1000));
      return true;
    } else {
      //console.log(token);
      //console.log('auth.service.ts -----------------------------------------> token válido ainda...', new Date().getTime() - (token.exp * 1000));
      //console.log(new Date().getTime());
      //console.log(token.exp * 1000);
      return false;
    }
  };

  public getToken(): string {
    let tk;
    if (this.currenToken)
      tk = this.currenToken;
    else
      tk = localStorage.getItem('x-token');
    //
    if (tk && tk != "undefined") { // por algum motivo o undefined aqui é uma string que vem do localStorage.
      //console.log('auth.service.ts ----- o token, recuperado do local storage, decodificado', this.parseJwt(tk));
      let parse = this.parseJwt(tk)
      if (this.isExpired(parse)) {
        this.logout();
        return '';
      }
      this.currentUser['name'] = parse.name;
      this.currentUser['email'] = parse.email;
      this.currentUser['role'] = parse.role;
      this.currenToken = tk;
      //
      //
      /*this.timer = setInterval(
        (tm) => {
          if (this.currenToken) {
            if (this.isExpired(this.parseJwt(this.currenToken))) {
              //console.log('token expirado.......');
              clearInterval(this.timer);
              this.logout();
              this.router.navigate(['/login']);
              this.messageService.info('Usuário desligado por inatividade', false);
            }
            //console.log('token NÃO expirado.......');
          }
        },
        1000 * 60 * 5 // 5 min
      );*/
      //
      //
      return tk;
    } else {
      return '';
    }
    //return  tk ? tk : '';
  }

  public setToken(token: string) {
    localStorage.setItem('x-token', token);
    this.currenToken = token;
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
    //return this.http.post(this.authUrl, model);
    return this.http.post<any>(this.authUrl, model).pipe(
      tap(
        (obj) => {
          //console.log('auth.service.ts ----- to aqui no login', obj);
          //this.isLoggedIn = true;
          const tk = obj['x-access-token'];
          this.setToken(tk);
          this.currentUser['name'] = obj['x-user-name'];
          this.currentUser['email'] = obj['x-user-email'];
          this.currentUser['role'] = obj['x-user-role'];
        }
      ),
      catchError(this.handleError<any>('login'))
    );
  }

  public newPassword(model: any): Observable<any> {
    //return this.http.post(this.authUrl, model);
    return this.http.post<any>(this.authUrl, model).pipe(
      tap(
        (obj) => {
          //console.log('auth.service.ts ----- to aqui no login', obj);
        }
      ),
      catchError(this.handleError<any>('newPassword'))
    );
  }

  public logout() {
    //this.isLoggedIn = false;
    //console.log('auth.service.ts ----- logout');
    localStorage.removeItem('x-token');
    localStorage.removeItem('x-permissions');
    this.permissionList = [];
    this.currentUser = [];
    this.currenToken = '';
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
