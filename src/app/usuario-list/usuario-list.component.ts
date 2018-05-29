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

  private usuarioDeleteWait: string;

  constructor(
    private usuarioService: UsuarioService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    const that = this;
    this.usuarioService.getUsuarios().subscribe(
      function(usu) {
        that.usuariosList = usu;
      }
    );
  }

  public onNewUsuario() {
    this.route.navigate(['/usuario/create/']);
  }

  public onSelectUsuario(idUsuario: string) {
    this.route.navigate(['/usuario/edit/' + idUsuario]);
  }

  public onDeleteUsuario(id: string) {
    this.usuarioDeleteWait = id;
  }

  public onConfirmDeleteUsuario() {
    this.usuarioService.deleteUsuario(this.usuarioDeleteWait).subscribe(
      // retirar usuario excluído da lista!
      // TODO deve haver uma verficação aqui se foi um sucesso... antes de tirar da lista
      () => {
        this.usuariosList = this.usuariosList.filter(el => {
          return el._id !== this.usuarioDeleteWait;
        });
      }
    );
  }

}
