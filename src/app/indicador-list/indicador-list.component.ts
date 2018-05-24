import { Component, OnInit } from '@angular/core';

import { IndicadorService } from '../indicador-service/indicador.service';

import { Indicador } from '../_models/indicador.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicador-list',
  templateUrl: './indicador-list.component.html',
  styleUrls: ['./indicador-list.component.css']
})
export class IndicadorListComponent implements OnInit {

  public indicadorList: Indicador[];

  private deleteIndicadorWait: number;

  constructor(
    private indicadorService: IndicadorService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getIndicadores();
  }

  getIndicadores() {
    // subscrive fica ouvindo o observable (do serviço) e dispara a função quando receber a lista de
    // indicadores... a função para a lista recebida para a variável local de lista de indicadores.
    this.indicadorService.getIndicadores().subscribe(
      (inds) => { this.indicadorList = inds; }
    );
  }

  // vai para tela de novo
  onNewIndicator() {
    this.route.navigate(['/indicador/create']);
  }

  // vai para tela de edição/detalhe
  onSelectEditIndicador(idIndicador: number) {
    console.log('indicador-list.componente onSelectEditIndicador()');
    this.route.navigate(['/indicador/detail/' + idIndicador]);
  }

  // grupo de funções para deletar (confirmação no popup)
  public onSelectDeleteProjeto(idProjeto: number): void {
    console.log('projeto-list.componente onSelectDeleteProjeto()');
    this.deleteIndicadorWait = idProjeto;
  }

  public onSelectDeleteOkProjeto() {
    if (this.deleteIndicadorWait) {
      // chama serviço para deletar Projeto
      this.indicadorService.deleteIndicador(this.deleteIndicadorWait);
      this.deleteIndicadorWait = null;
    }
  }

  public onDeselectDeleteOkProjeto() {
    this.deleteIndicadorWait = null;
  }

}
