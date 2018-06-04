import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../_controllers/message/service/message.service';

import { Permissao } from '../_models/permissao.model';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  private permissaoApiUrl = 'api/permissao';

  constructor(
    private httpService: HttpClient,
    private messageService: MessageService
  ) { }

  get(): Observable<Permissao[]> {
    return this.httpService.get<Permissao[]>(this.permissaoApiUrl).pipe(
      tap(
        r => console.log(r)
      ),
      catchError(this.handleError<Permissao[]>('get'))
    );
  }
  getOne(id: string): Observable<Permissao> {
    return this.httpService.get<Permissao>(this.permissaoApiUrl + '/' + id).pipe(
      catchError(this.handleError<Permissao>('getOne'))
    );
  }
  put(id: string, obj: Permissao): Observable<Permissao> {
    return this.httpService.put<Permissao>(this.permissaoApiUrl + '/' + id, obj).pipe(
      tap(
        () => {
          this.messageService.info('Permissões alteradas.', false);
        }
      ),
      catchError(this.handleError<Permissao>('put'))
    );
  }

  private handleError<T>(operation = 'Operação', result?: T) {
    return (error: any): Observable<T> => {
      console.error('handleError em permissao.service', error);
      // this.log(`${operation} falhou: ${error.message}`);
      /*if (error.statusText == "Unknow Error") {
        this.messageService.error(`Falha na desconhecida na operação com o servidor.`, false);
      } else {
        this.messageService.error(`Houve uma falha na operação ${operation}`, true);
      }*/
      this.messageService.error(error.error.message, true);
      // retorna um resultado vazio para app continuar rodando
      return of(result as T);
    };
  }
}
