import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
    // serviço usuario
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    // pegar o usuário no serviço atraves do ID enviado como parametro
    this.route.snapshot.paramMap.get('id');
  }

}
