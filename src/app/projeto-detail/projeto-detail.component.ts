import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProjetoService } from '../projeto-services/projeto.service';

@Component({
  selector: 'app-projeto-detail',
  templateUrl: './projeto-detail.component.html',
  styleUrls: ['./projeto-detail.component.css']
})
export class ProjetoDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private projeto: ProjetoService
  ) { }

  ngOnInit() {
    this.getProjetoUrl();
  }

  getProjetoUrl() {
    // pegar o usuário no serviço atraves do ID enviado como parametro
    const id = +this.route.snapshot.paramMap.get('id'); // o + converte a string para number
    // serviço get projeto
    this.projeto.getProjetoById(id).subscribe(
      //
    );
  }

}
