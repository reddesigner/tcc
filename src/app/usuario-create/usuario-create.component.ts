import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Usuario } from '../_models/usuarios.model';
import { UsuarioService } from '../usuario-service/usuario.service';
import { MessageService } from '../_controllers/message/service/message.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  public newUser: Usuario = new Usuario();
  public confirmMail: String;

  constructor(
    private usuario: UsuarioService,
    private message: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('on submit...');
    this.OnSave();
  }

  OnSave() {
    if (this.validate()) {
      this.usuario.newUsuario(this.newUser).subscribe(
        (usu) => {
          this.goBack();
        }
      );
    }
  }

  validate(): boolean {
    // verifica se email é igual
    if (this.confirmMail != this.newUser.email) {
      this.message.warning('O email deve ser confirmado.');
      return false;
    }
    // verifica se perfil foi escolhido
    return true;
  }

  goBack() {
    this.location.back();
  }

}
