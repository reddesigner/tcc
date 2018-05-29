import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IndicadorService } from '../indicador-service/indicador.service';
import { Indicador } from '../_models/indicador.model';

@Component({
  selector: 'app-indicador-detail',
  templateUrl: './indicador-detail.component.html',
  styleUrls: ['./indicador-detail.component.css']
})
export class IndicadorDetailComponent implements OnInit {

  public indicadorDetail: Indicador = new Indicador();

  constructor(
    private route: ActivatedRoute,
    private indicador: IndicadorService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getIndicadorUrl();
  }

  getIndicadorUrl() {
    // pegar o usuário no serviço atraves do ID enviado como parametro
    const id = this.route.snapshot.paramMap.get('id'); // este get() é sempre de 'id'
    // console.log('o id aqui é: ', id);
    // serviço get indicador
    this.indicador.getIndicadorById(id).subscribe(
      indicador => this.indicadorDetail = indicador
    );
  }

  public goBack(): void {
    this.location.back();
  }
}
