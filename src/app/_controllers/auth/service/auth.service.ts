import { Injectable } from '@angular/core';
// import { decode } from 'jwt-decode';
// jwt-code de angular2-jwt (instalado com npm) não funcionou

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): String {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): Boolean {
    const tk = this.getToken();
    // verificar se token está expirado
    // return tokenNotExpired(null, tk);
    return tk ? true : false;
  }
}
