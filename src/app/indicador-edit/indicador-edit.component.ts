import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IndicadorService } from '../indicador-service/indicador.service';
import { Indicador } from '../_models/indicador.model';

@Component({
  selector: 'app-indicador-edit',
  templateUrl: './indicador-edit.component.html',
  styleUrls: ['./indicador-edit.component.css']
})
export class IndicadorEditComponent implements OnInit {

  public indicadorEdit: Indicador = new Indicador();

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
    // serviço get indicador
    this.indicador.getIndicadorById(id).subscribe(
      indicador => this.indicadorEdit = indicador
    );
  }

  onEditIndicator() {
    // put
    console.log('edit...');
    this.indicador.putIndicador(this.indicadorEdit).subscribe(
      () => {
        this.goBack();
      }
    );
  }

  public goBack(): void {
    this.location.back();
  }

}
