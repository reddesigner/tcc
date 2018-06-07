import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../_controllers/message/service/message.service';

import { ProjetoService } from '../projeto-services/projeto.service';
//import { IndicadorService } from '../indicador-service/indicador.service';

import { Projeto } from '../_models/projeto.model';
import { Indicador } from '../_models/indicador.model';

@Component({
  selector: 'app-projeto-indicador-fase',
  templateUrl: './projeto-indicador-fase.component.html',
  styleUrls: ['./projeto-indicador-fase.component.css']
})
export class ProjetoIndicadorFaseComponent implements OnInit {

  public projetoRef: Projeto = new Projeto(); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
  public indicadoresRef1: Indicador[] = [];
  public indicadoresRef2: Indicador[] = [];
  public indicadoresRef3: Indicador[] = [];
  public indicadoresRef4: Indicador[] = [];
  public projetoIndicadoresSelecionadosF1 = new Array<any>();
  public projetoIndicadoresSelecionadosF2 = new Array<any>();
  public projetoIndicadoresSelecionadosF3 = new Array<any>();
  public projetoIndicadoresSelecionadosF4 = new Array<any>();

  constructor(
    private projetoService: ProjetoService,
    //private indicadorService: IndicadorService,
    private route: ActivatedRoute,
    private location: Location,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.getProjetoById();
    //this.getIndicadores();
  }

  getProjetoById() {
    // pega ID da url
    const id = this.route.snapshot.paramMap.get('id');
    this.projetoService.getProjetoById(id).subscribe(
      (prj) => {
        this.projetoRef = prj;
        this.projetoIndicadoresSelecionadosF1 = prj.phases['phase1'];
        this.projetoIndicadoresSelecionadosF2 = prj.phases['phase2'];
        this.projetoIndicadoresSelecionadosF3 = prj.phases['phase3'];
        this.projetoIndicadoresSelecionadosF4 = prj.phases['phase4'];
        // JSON.stringfy() é usado aqui para criar clones de prj.indicators
        this.indicadoresRef1 = JSON.parse(JSON.stringify(prj.indicators));
        this.indicadoresRef2 = JSON.parse(JSON.stringify(prj.indicators));
        this.indicadoresRef3 = JSON.parse(JSON.stringify(prj.indicators));
        this.indicadoresRef4 = JSON.parse(JSON.stringify(prj.indicators));
        console.log('get projeto', prj);
        //this.checkSelecionadosDisponiveis();
      }
    );
  }

  /*getIndicadores() {
    this.indicadorService.getIndicadores().subscribe(
      (inds) => {
        // usar JSON.parse(JSON.stringify(inds)); para criar 'clones' de inds
        this.indicadoresRef1 = JSON.parse(JSON.stringify(inds));
        this.indicadoresRef2 = JSON.parse(JSON.stringify(inds));
        this.indicadoresRef3 = JSON.parse(JSON.stringify(inds));
        this.indicadoresRef4 = JSON.parse(JSON.stringify(inds));
        console.log('get indicadores', inds);
        this.checkSelecionadosDisponiveis();
      }
    );
  }*/

  onSave() {
    this.projetoRef.phases['phase1'] = this.projetoIndicadoresSelecionadosF1;
    this.projetoRef.phases['phase2'] = this.projetoIndicadoresSelecionadosF2;
    this.projetoRef.phases['phase3'] = this.projetoIndicadoresSelecionadosF3;
    this.projetoRef.phases['phase4'] = this.projetoIndicadoresSelecionadosF4;
    console.log('o que vai ser salvo', this.projetoRef);
    
    this.projetoService.putProjeto(this.projetoRef, 'indicador-fase').subscribe(
      (prj) => {
        console.log('projeto editado', prj)
        if (
          this.projetoRef.phases.phase1.length == 0 &&
          this.projetoRef.phases.phase2.length == 0 &&
          this.projetoRef.phases.phase3.length == 0 &&
          this.projetoRef.phases.phase4.length == 0
        ) {
          this.message.warning('Nenhum projeto deveria ficar sem indicadores', false);
        }
      }
    );
    /**/
  }

  goBack() {
    this.location.back();
  }

  removeItem(indicador: Indicador, fase: number) {
    switch(fase){
      case 1:
        this.projetoIndicadoresSelecionadosF1 = this.projetoIndicadoresSelecionadosF1.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
        this.indicadoresRef1.push(indicador);
      break;
      case 2:
        this.projetoIndicadoresSelecionadosF2 = this.projetoIndicadoresSelecionadosF2.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
        this.indicadoresRef2.push(indicador);
      break;
      case 3:
        this.projetoIndicadoresSelecionadosF3 = this.projetoIndicadoresSelecionadosF3.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
        this.indicadoresRef3.push(indicador);
      break;
      case 4:
        this.projetoIndicadoresSelecionadosF4 = this.projetoIndicadoresSelecionadosF4.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
        this.indicadoresRef4.push(indicador);
      break;
    }
  }

  insertItem(indicador: Indicador, fase: number) {
    switch(fase){
      case 1:
        this.projetoIndicadoresSelecionadosF1.push(indicador);
        this.indicadoresRef1 = this.indicadoresRef1.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
      break;
      case 2:
        this.projetoIndicadoresSelecionadosF2.push(indicador);
        this.indicadoresRef2 = this.indicadoresRef2.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
      break;
      case 3:
        this.projetoIndicadoresSelecionadosF3.push(indicador);
        this.indicadoresRef3 = this.indicadoresRef3.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
      break;
      case 4:
        this.projetoIndicadoresSelecionadosF4.push(indicador);
        this.indicadoresRef4 = this.indicadoresRef4.filter(
          (el) => {
            return el._id !== indicador._id;
          }
        );
      break;
    }
  }

  /*checkSelecionadosDisponiveis() {
    // é chamada pelos métodos que recebem requisições
    // é verificado se as duas já foram feitas, então executa a compraração
    if (this.projetoRef._id !== '' && this.projetoRef._id !== undefined && this.indicadoresRef4.length > 0) {
      // faz um loop na array dos alocados
      for(let i=0; i<this.projetoIndicadoresSelecionadosF1.length; i++){
        // retira, com um filtro, do array dos disponíveis aqueles que encontrar
        this.indicadoresRef1 = this.indicadoresRef1.filter(
          (el) => {
            return el._id !== this.projetoIndicadoresSelecionadosF1[i]._id;
          }
        );
      }
      for(let i=0; i<this.projetoIndicadoresSelecionadosF2.length; i++){
        this.indicadoresRef2 = this.indicadoresRef2.filter(
          (el) => {
            return el._id !== this.projetoIndicadoresSelecionadosF2[i]._id;
          }
        );
      }
      for(let i=0; i<this.projetoIndicadoresSelecionadosF3.length; i++){
        this.indicadoresRef3 = this.indicadoresRef3.filter(
          (el) => {
            return el._id !== this.projetoIndicadoresSelecionadosF3[i]._id;
          }
        );
      }
      for(let i=0; i<this.projetoIndicadoresSelecionadosF4.length; i++){
        this.indicadoresRef4 = this.indicadoresRef4.filter(
          (el) => {
            return el._id !== this.projetoIndicadoresSelecionadosF4[i]._id;
          }
        );
      }
      //
    }
  }*/

}
