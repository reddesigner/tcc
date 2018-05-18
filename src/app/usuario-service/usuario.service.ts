import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//

import { Usuario } from '../_models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioUrl = 'api/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.usuarioUrl);

  }

}
