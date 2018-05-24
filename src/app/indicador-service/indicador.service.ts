import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Indicador } from '../_models/indicador.model';

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
    private http: HttpClient
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
      tap(ind => console.log('TAP: gravando novo indicador no banco...', ind)),
      catchError(this.handleError<Indicador>('postIndicador'))
    );
  }

  // editar
  putIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.put<Indicador>(this.indicadoresApiUrl, indicador, this.httpOptions);
  }

  // excluir
  deleteIndicador(id: number) {
    return this.http.delete<Indicador>(this.indicadoresApiUrl + '/' + id, this.httpOptions);
  }

  private log(message: string): void {
    // message service
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
