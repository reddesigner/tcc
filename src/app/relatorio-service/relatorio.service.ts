import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Projeto } from '../_models/projeto.model';
import { MessageService } from '../_controllers/message/service/message.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private urlApi = 'api/relatorio';

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) { }

  public getAll(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.urlApi).pipe(
      tap(
        () => this.log('Serviço de relatorios retornou consulta getAll')
      ),
      catchError(this.handleError<Projeto[]>('getProjetoRelatorio-All'))
    );
  }

  public getOne(id: string): Observable<Projeto> {
    return this.http.get<Projeto>(this.urlApi + '/' + id).pipe(
      tap(
        () => this.log('Serviço de relatorios retornou consulta getOne')
      ),
      catchError(this.handleError<Projeto>('getProjetoRelatorio-One'))
    );
  }

  private log(message: string): void {
    // message service
    console.log(message);
  }

  private handleError<T>(operation = 'Operação ', result?: T) {
      return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} falhou: ${error.message}`);
      // this.message.error(`${operation} falhou: ${error.message}`, true);
      this.message.error(error.error.message, true);
      return of(result as T);
    };
  }
}
