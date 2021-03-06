import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../_controllers/message/service/message.service';

import { Usuario } from '../_models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioUrl = 'api/usuario';

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuarioUrl).pipe(
      catchError(this.errorHandler<Usuario[]>('getUsuarios'))
    );
  }

  getOneUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.usuarioUrl + '/' + id).pipe(
      catchError(this.errorHandler<Usuario>('getUsuario'))
    );
  }

  newUsuario(usu: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usu).pipe(
      tap(
        () => this.message.success('Usuario criado.')
      ),
      catchError(this.errorHandler<Usuario>('newUsuario'))
    );
  }

  editUsuario(id: string, usu: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.usuarioUrl + '/' + id, usu).pipe(
      tap(
        () => this.message.success('Usuario salvo.')
      ),
      catchError(this.errorHandler<Usuario>('editUsuario'))
    );
  }

  deleteUsuario(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(this.usuarioUrl + '/' + id).pipe(
      tap(
        () => this.message.success('Usuario excluído.')
      ),
      catchError(this.errorHandler<Usuario>('deleteUsuario'))
    );
  }

  errorHandler<T>(operation = 'Operação', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`Houve uma falha na operação ${operation}`);
      if(error.error && error.error.message)
        this.message.error(error.error.message, true);
      else
        this.message.error('Erro não identificado. [usu.ser.'+operation+']', true);
      /*if (error.error.message.indexOf('jwt expired') > 0) {
        // TODO logout
      }*/
      return of(result as T);
    };
  }

}
