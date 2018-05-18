import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Indicador } from '../_models/indicador.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private indicadoresApiUrl = 'api/indicadores';

  constructor(
    private http: HttpClient
  ) { }

  getIndicadores(): Observable<Indicador[]> {

    return this.http.get<Indicador[]>(this.indicadoresApiUrl);

  }

}
