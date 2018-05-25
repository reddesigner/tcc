import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Indicador } from '../_models/indicador.model';

import { MessageService } from '../_controllers/message/service/message.service';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private indicadoresApiUrl = 'api/indicadores';

  private httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // headers: new HttpHeaders({ 'Content-Type': 'x-www-form-urlencoded' })
    headers: new HttpHeaders({ 'Content-Type': 'form-data' })
  };

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) { }

  // listar todos
  getIndicadores(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(this.indicadoresApiUrl).pipe(
      tap(),
      catchError(this.handleError<Indicador[]>('getIndicadores'))
    );
  }

  // retorna um
  getIndicadorById(id: number): Observable<Indicador> {
    return this.http.get<Indicador>(this.indicadoresApiUrl + '/' + id).pipe(
      tap(),
      catchError(this.handleError<Indicador>('getIndicadorById'))
    );
  }

  // inserir novo
  postIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(this.indicadoresApiUrl, indicador, this.httpOptions).pipe(
      tap(ind => {
        console.log('TAP: gravando novo indicador no banco...', ind);
        // foi um sucesso!
        this.message.success(`O indicador ${ind.name} foi inserido com sucesso`, true);
      }),
      catchError(this.handleError<Indicador>('postIndicador'))
    );
  }

  // editar
  putIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.put<Indicador>(this.indicadoresApiUrl, indicador, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Indicador>('putIndicador'))
    );
  }

  // excluir
  deleteIndicador(id: number) {
    return this.http.delete<Indicador>(this.indicadoresApiUrl + '/' + id, this.httpOptions).pipe(
      tap(() => {
        console.log('sucesso na exclusão!');
        this.message.error(`O indicador foi excluído com sucesso`, true);
      }),
      catchError(this.handleError<Indicador>('deleteIndicador'))
    );
  }

  private log(message: string): void {
    // message service
    console.log(message);
  }

  private handleError<T>(operation = 'Operação', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} falhou: ${error.message}`);
      this.message.error(`${operation} falhou: ${error.message}`);
      // retorna um resultado vazio para app continuar rodando
      return of(result as T);
    };
  }
}
