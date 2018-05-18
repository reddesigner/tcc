import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { of } from 'rxjs';

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

    return this.http.get<Projeto[]>(this.projetoURL);

  }

}
