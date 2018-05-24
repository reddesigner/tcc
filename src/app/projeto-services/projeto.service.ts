import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Projeto } from '../_models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private projetoURL = 'api/projetos';

  constructor(
    private http: HttpClient
  ) { }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.projetoURL).pipe(
      tap( () => {} ),
      catchError(this.handleError('getProjetos', []))
    );
  }

  getProjetoById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(this.projetoURL + '/' + id).pipe(
      tap(),
      catchError(this.handleError<Projeto>('getProjeto'))
    );
  }

  postProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.projetoURL, projeto).pipe(
      tap(),
      catchError(this.handleError<Projeto>('getProjeto'))
    );
  }

  deleteProjeto(id: Number): Observable<Projeto> {
    return this.http.post<Projeto>(this.projetoURL, id).pipe(
      tap(),
      catchError(this.handleError<Projeto>('getProjeto'))
    );
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
