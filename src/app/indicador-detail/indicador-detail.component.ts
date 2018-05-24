import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { IndicadorService } from '../indicador-service/indicador.service';
import { Indicador } from '../_models/indicador.model';

@Component({
  selector: 'app-indicador-detail',
  templateUrl: './indicador-detail.component.html',
  styleUrls: ['./indicador-detail.component.css']
})
export class IndicadorDetailComponent implements OnInit {

  private indicadorDetail: Indicador;

  constructor(
    private route: ActivatedRoute,
    private indicador: IndicadorService
  ) { }

  ngOnInit() {
  }

  getIndicadorUrl() {
    // pegar o usuário no serviço atraves do ID enviado como parametro
    const id = +this.route.snapshot.paramMap.get('id'); // o + converte a string para number
    // serviço get indicador
    this.indicador.getIndicadorById(id).subscribe(
      indicador => this.indicadorDetail = indicador
    );
  }
}
