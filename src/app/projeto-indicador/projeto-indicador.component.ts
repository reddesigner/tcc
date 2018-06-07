import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../_controllers/message/service/message.service';

import { ProjetoService } from '../projeto-services/projeto.service';
import { IndicadorService } from '../indicador-service/indicador.service';

import { Projeto } from '../_models/projeto.model';
import { Indicador } from '../_models/indicador.model';

@Component({
  selector: 'app-projeto-indicador',
  templateUrl: './projeto-indicador.component.html',
  styleUrls: ['./projeto-indicador.component.css']
})
export class ProjetoIndicadorComponent implements OnInit {

  public projetoRef: Projeto = new Projeto(); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
  public indicadoresRef: Indicador[] = [];
  public projetoIndicadoresSelecionados = new Array<any>();

  constructor(
    private projetoService: ProjetoService,
    private indicadorService: IndicadorService,
    private route: ActivatedRoute,
    private location: Location,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.getProjetoById();
    this.getIndicadores();
  }

  getProjetoById() {
    // pega ID da url
    const id = this.route.snapshot.paramMap.get('id');
    this.projetoService.getProjetoById(id).subscribe(
      (prj) => {
        this.projetoRef = prj;
        this.projetoIndicadoresSelecionados = prj.indicators;
        console.log('get projeto', prj);
        this.checkSelecionadosDisponiveis();
      }
    );
  }

  getIndicadores() {
    this.indicadorService.getIndicadores().subscribe(
      (inds) => {
        // usar JSON.parse(JSON.stringify(inds)); para criar 'clones' de inds
        this.indicadoresRef = JSON.parse(JSON.stringify(inds));
        console.log('get indicadores', inds);
        this.checkSelecionadosDisponiveis();
      }
    );
  }

  onSave() {
    this.projetoRef.indicators = this.projetoIndicadoresSelecionados;
    console.log('o que vai ser salvo', this.projetoRef);
    
    this.projetoService.putProjeto(this.projetoRef, 'indicador').subscribe(
      (prj) => {
        console.log('projeto editado', prj)
        if (this.projetoRef.indicators.length == 0) {
          this.message.warning('Nenhum projeto deveria ficar sem indicadores', false);
        }
      }
    );
    /**/
  }

  goBack() {
    this.location.back();
  }

  removeItem(indicador: Indicador) {
    this.projetoIndicadoresSelecionados = this.projetoIndicadoresSelecionados.filter(
      (el) => {
        return el._id !== indicador._id;
      }
    );
    this.indicadoresRef.push(indicador);
  }

  insertItem(indicador: Indicador) {
    this.projetoIndicadoresSelecionados.push(indicador);
    this.indicadoresRef = this.indicadoresRef.filter(
      (el) => {
        return el._id !== indicador._id;
      }
    );
  }

  checkSelecionadosDisponiveis() {
    // é chamada pelos métodos que recebem requisições
    // é verificado se as duas já foram feitas, então executa a compraração
    if (this.projetoRef._id !== '' && this.projetoRef._id !== undefined && this.indicadoresRef.length > 0) {
      // faz um loop na array dos alocados
      for(let i=0; i<this.projetoIndicadoresSelecionados.length; i++){
        // retira, com um filtro, do array dos disponíveis aqueles que encontrar
        this.indicadoresRef = this.indicadoresRef.filter(
          (el) => {
            return el._id !== this.projetoIndicadoresSelecionados[i]._id;
          }
        );
      }
      //
    }
  }

}
