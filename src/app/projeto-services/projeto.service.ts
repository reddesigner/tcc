import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../_controllers/message/service/message.service';

import { Projeto } from '../_models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private projetoURL = 'api/projeto';
  private projetoEquipeURL = 'api/projeto-equipe';
  private projetoIndicadorFaseURL = 'api/projeto-indicador-fase';

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) { }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>( this.projetoURL).pipe(
      tap( () => {} ),
      catchError(this.handleError('getProjetos', []))
    );
  }

  getProjetoById(id: string): Observable<Projeto> {
    return this.http.get<Projeto>(this.projetoURL + '/' + id).pipe(
      tap(),
      catchError(this.handleError<Projeto>('getProjeto'))
    );
  }

  postProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.projetoURL, projeto).pipe(
      tap(
        () => {
          this.message.success('Projeto salvo com sucesso.', true);
        }
      ),
      catchError(this.handleError<Projeto>('postProjeto'))
    );
  }

  putProjeto(projeto: Projeto, subtype: string = 'projeto'): Observable<Projeto> {
    let putProjetoUrl: string;
    switch(subtype){
      case 'projeto':
        putProjetoUrl = this.projetoURL;
      break;
      case 'equipe':
        putProjetoUrl = this.projetoEquipeURL;
      break;
      case 'indicador-fase':
        putProjetoUrl = this.projetoIndicadorFaseURL;
      break;
    }
    return this.http.put<Projeto>(putProjetoUrl + '/' + projeto._id, projeto).pipe(
      tap(
        () => {
          this.message.success('Projeto editado e salvo com sucesso.', true);
        }
      ),
      catchError(this.handleError<Projeto>('putProjeto'))
    );
  }

  deleteProjeto(id: string): Observable<Projeto> {
    return this.http.delete<Projeto>(this.projetoURL + '/' + id).pipe(
      tap(
        (obj) => {
          // delete volta apenas mensagem, não um Projeto
          this.message.success(obj['message'], true);
        }
      ),
      catchError(this.handleError<Projeto>('getProjeto'))
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
      this.message.error(`${operation} falhou: ${error.message}`, true);
      return of(result as T);
    };
  }

}
