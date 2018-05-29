import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../_controllers/message/service/message.service';

import { ProjetoService } from '../projeto-services/projeto.service';
import { UsuarioService } from '../usuario-service/usuario.service';

import { Projeto } from '../_models/projeto.model';
import { Usuario } from '../_models/usuarios.model';

@Component({
  selector: 'app-projeto-equipe',
  templateUrl: './projeto-equipe.component.html',
  styleUrls: ['./projeto-equipe.component.css']
})
export class ProjetoEquipeComponent implements OnInit {

  public projetoRef: Projeto = new Projeto(); // cria um novo 'new ...()' pq ele precisa ser carregado, mesmo que vazio, na view antes do ajax retornar algo
  public usuarioRef: Usuario[] = [];
  public projetoUsuariosAlocados = new Array<any>();

  constructor(
    private projetoService: ProjetoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private location: Location,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.getProjetoById();
    this.getUsuarios();
  }

  getProjetoById() {
    // pega ID da url
    const id = this.route.snapshot.paramMap.get('id');
    this.projetoService.getProjetoById(id).subscribe(
      (prj) => {
        this.projetoRef = prj;
        this.projetoUsuariosAlocados = prj.team;
        console.log('get projeto', prj);
        this.checkAlocadosDisponiveis();
      }
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usrs) => {
        this.usuarioRef = usrs;
        console.log('get usuarios', usrs);
        this.checkAlocadosDisponiveis();
      }
    );
  }

  onSave() {
    this.projetoRef.team = this.projetoUsuariosAlocados;
    this.projetoService.putProjeto(this.projetoRef, 'equipe').subscribe(
      (prj) => {
        console.log('projeto editado', prj)
        if (this.projetoRef.team.length == 0) {
          this.message.warning('Nenhum projeto deveria ficar sem time', false);
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }

  removeUser(usuario: Usuario) {
    this.projetoUsuariosAlocados = this.projetoUsuariosAlocados.filter(
      (el) => {
        return el._id !== usuario._id;
      }
    );
    this.usuarioRef.push(usuario);
  }

  insertUser(usuario: Usuario) {
    //const newUsr = { _id: id, name: name };
    this.projetoUsuariosAlocados.push(usuario);
    this.usuarioRef = this.usuarioRef.filter(
      (el) => {
        return el._id !== usuario._id;
      }
    );
  }

  checkAlocadosDisponiveis() {
    // é chamada pelos métodos que recebem requisições
    // é verificado se as duas já foram feitas, então executa a compraração
    if (this.projetoRef._id !== '' && this.projetoRef._id !== undefined && this.usuarioRef.length > 0) {
      // faz um loop na array dos alocados
      for(let i=0; i<this.projetoUsuariosAlocados.length; i++){
        // retira, com um filtro, do array dos disponíveis aqueles que encontrar
        this.usuarioRef = this.usuarioRef.filter(
          (el) => {
            return el._id !== this.projetoUsuariosAlocados[i]._id;
          }
        );
      }

    }
  }

}
