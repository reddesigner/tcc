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

  private indicadoresApiUrl = 'api/indicador';

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
  getIndicadorById(id: string): Observable<Indicador> {
    console.log('indicador.service --- id que vai para get by id...', id);
    return this.http.get<Indicador>(this.indicadoresApiUrl + '/' + id).pipe(
      tap(
        () => {
          //console.log('indicador.service --- TAP: editando indicador...');
      }),
      catchError(this.handleError<Indicador>('getIndicadorById'))
    );
  }

  // inserir novo
  postIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(this.indicadoresApiUrl, indicador).pipe(
      tap(ind => {
        console.log('indicador.service --- TAP: gravando novo indicador no banco...', ind);
        // foi um sucesso!
        this.message.success(`O indicador ${ind.name} foi inserido com sucesso`, true);
      }),
      catchError(this.handleError<Indicador>('postIndicador'))
    );
  }

  // editar
  putIndicador(indicador: Indicador): Observable<Indicador> {
    console.log('indicador.service --- o indicador aqui no put é...', indicador);
    return this.http.put<Indicador>(this.indicadoresApiUrl + '/' +indicador._id, indicador).pipe(
      tap(
        /*() => {
          this.message.success(`O indicador foi editado com sucesso`, true);
        }*/
      ),
      catchError(this.handleError<Indicador>('putIndicador'))
    );
  }

  // excluir
  deleteIndicador(id: string) {
    return this.http.delete<Indicador>(this.indicadoresApiUrl + '/' + id).pipe(
      tap(() => {
        console.log('indicador.service --- sucesso na exclusão!');
        this.message.error(`O indicador foi excluído com sucesso`, true);
      }),
      catchError(this.handleError<Indicador>('deleteIndicador'))
    );
  }

  private log(message: string): void {
    // message service
    console.log('indicador.service --- indicador.service.ts - ' + message);
  }

  private handleError<T>(operation = 'Operação', result?: T) {
    return (error: any): Observable<T> => {
      // console.log('indicador.service.ts - ', error);
      // console.error('handleError em indicador.service', error);
      this.log(`${operation} falhou: ${error.message}`);
      // this.message.error(`Houve uma falha na operação ${operation}`, true);
      if (error.error.message)
        this.message.error(error.error.message, true);
      else
        this.message.error('Erro não identificado. [ind.ser.'+operation+']', true);
      // retorna um resultado vazio para app continuar rodando
      return of(result as T);
    };
  }
}
