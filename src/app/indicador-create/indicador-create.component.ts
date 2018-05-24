import { Component, OnInit } from '@angular/core';

import { Indicador } from '../_models/indicador.model';

import { IndicadorService } from '../indicador-service/indicador.service';

@Component({
  selector: 'app-indicador-create',
  templateUrl: './indicador-create.component.html',
  styleUrls: ['./indicador-create.component.css']
})
export class IndicadorCreateComponent implements OnInit {

  // criar um modelo baseado no model de indicador
  // este modelo ficará ligado ao formulário na view pelo ngModel
  public newIndicador = new Indicador();

  constructor(
    private indicadorService: IndicadorService
  ) { }

  ngOnInit() {
  }

  onNewIndicator() {
    console.log('o objeto indicador é:', this.newIndicador);
    this.indicadorService.postIndicador(this.newIndicador).subscribe(
      () => { console.log('a promessa voltou para componente indicador-create'); }
    );
  }

}
