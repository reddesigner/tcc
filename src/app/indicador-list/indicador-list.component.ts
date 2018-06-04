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

  private deleteIndicadorWait: string;

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
      (inds) => {
        this.indicadorList = inds;
      }
    );
  }

  // vai para tela de novo
  onNewIndicator() {
    this.route.navigate(['/indicador/create']);
  }

  // vai para tela de edição/detalhe
  onSelectEditIndicador(idIndicador: string) {
    console.log('indicador-list.componente onSelectEditIndicador()');
    this.route.navigate(['/indicador/edit/' + idIndicador]);
  }

  // grupo de funções para deletar (confirmação no popup)
  public onSelectDeleteIndicador(idIndicador: string): void {
    console.log('indicador-list.componente onSelectDeleteIndicador()');
    this.deleteIndicadorWait = idIndicador;
  }

  public onSelectDeleteOkIndicador() {
    if (this.deleteIndicadorWait) {
      // chama serviço para deletar indicador
      this.indicadorService.deleteIndicador(this.deleteIndicadorWait).subscribe(
        () => {
          // console.log('voltou do DELETE indicador');
          this.indicadorList = this.indicadorList.filter(el => {
            // console.log('el.id ', el._id);
            // console.log('deleteIndicadorWait: ', this.deleteIndicadorWait);
            return el._id !== this.deleteIndicadorWait;
          });
          this.deleteIndicadorWait = null;
        }
      );
      // this.deleteIndicadorWait = null;
    }
  }

  public onDeselectDeleteOkIndicador() {
    this.deleteIndicadorWait = null;
  }

}
