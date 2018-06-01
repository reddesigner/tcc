import { Injectable } from '@angular/core';
// import { decode } from 'jwt-decode';
// jwt-code de angular2-jwt (instalado com npm) não funcionou

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): String {
    // return localStorage.getItem('token'); // TODO localstorage!
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VUVVAiLCJlbWFpbCI6InNldHVwQGVtYWlsLmNvbSIsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNTI3NzQ3NzU2LCJleHAiOjE1Mjc4MzQxNTZ9.GnRq_nhsipJD4_sgMIjh0HSTDh58FpYFpG6Ya19ZxGs';
  }

  public isAuthenticated(): Boolean {
    const tk = this.getToken();
    // verificar se token está expirado
    // return tokenNotExpired(null, tk);
    return tk ? true : false;
  }
}
