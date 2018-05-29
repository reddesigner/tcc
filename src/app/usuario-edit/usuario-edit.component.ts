import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from '../_models/usuarios.model';
import { UsuarioService } from '../usuario-service/usuario.service';
import { MessageService } from '../_controllers/message/service/message.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  public currentUser: Usuario = new Usuario();
  public confirmMail: String;
  // public alertConfirmMail: Boolean = false;
  public resetPassword: Boolean = false;

  constructor(
    private usuario: UsuarioService,
    private route: ActivatedRoute,
    private message: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id = this.route.snapshot.paramMap.get('id');
    this.usuario.getOneUsuario(id).subscribe(
      (usr) => {
        this.currentUser = usr;
        this.confirmMail = usr.email;
      }
    );
  }

  onSubmit() {
    if (this.validate()) {
      this.usuario.editUsuario(this.currentUser._id, this.currentUser).subscribe(
        (usu) => {
          this.goBack();
        }
      );
    }
  }

  validate(): boolean {
    if (this.resetPassword) {
      this.currentUser.firsttime = true;
    }
    console.log('na validação do usuario, antes de salvar', this.currentUser);
    // verifica se email é igual
    if (this.confirmMail != this.currentUser.email) {
      // this.alertConfirmMail = true;
      this.message.warning('O email deve ser confirmado.');
      return false;
    }
    // verifica se perfil foi escolhido
    return true;
  }

  goBack() {

  }

}
