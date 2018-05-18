import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { UsuarioService } from '../usuario-service/usuario.service';
import { Usuario } from '../_models/usuarios.model';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  public usuariosList: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {

    const that = this;
    this.usuarioService.getUsuarios().subscribe(function(usu) {
      that.usuariosList = usu;
    });

  }

  public onSelectUsuario(idUsuario: number) {

    // redirecionar para usuario-detail
    this.route.navigate(['/usuario/detail/' + idUsuario]);

  }

}
