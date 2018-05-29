import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Permissao } from '../_models/permissao.model';

import { PermissaoService } from '../permissao-service/permissao.service';

import { MessageService } from '../_controllers/message/service/message.service';

@Component({
  selector: 'app-permissao-list',
  templateUrl: './permissao-list.component.html',
  styleUrls: ['./permissao-list.component.css']
})
export class PermissaoListComponent implements OnInit {

  public viewPermission: Permissao[];
  public viewEditP: Permissao = new Permissao();

  public viewViews = [
    { view: 'Projetos', value: 'prj', route: '/projeto' },
    { view: 'Projetos - Equipe', value: 'prj-eqp', route: '/projeto-equipe' },
    { view: 'Projetos - Indicadores', value: 'prj-ind', route: 'projeto-indicador' },
    { view: 'Projetos - Indicadores - Fases', value: 'prj-ind-fas', route: '/projeto-indicador-fase' },
    { view: 'Indicadores', value: 'ind', route: '/indicador' },
    { view: 'Usuários', value: 'usr', route: '/usuario' },
    { view: 'Relatórios', value: 'rel', route: '/relatorio' }
  ];
  public showGroup: String = 'prj'; // inicia-se com o grupo de projetos sendo exibidos

  public viewRoles = [
    { title: 'Administrador', role: 'Administrador' },
    { title: 'Diretor', role: 'director' },
    { title: 'Líder do Escritório de Projetos', role: 'team principal' },
    { title: 'Gerente de Projeto', role: 'Gerente de Projeto' },
    { title: 'Líder de Time', role: 'team leader' }
  ];
  
  @ViewChild('chRoleAdmin_1') chRoleAdmin_1;
  @ViewChild('chRoleDirector_1') chRoleDirector_1;
  @ViewChild('chRolePrincipal_1') chRolePrincipal_1;
  @ViewChild('chRoleManager_1') chRoleManager_1;
  @ViewChild('chRoleLeader_1') chRoleLeader_1;

  @ViewChild('chRoleAdmin_2') chRoleAdmin_2;
  @ViewChild('chRoleDirector_2') chRoleDirector_2;
  @ViewChild('chRolePrincipal_2') chRolePrincipal_2;
  @ViewChild('chRoleManager_2') chRoleManager_2;
  @ViewChild('chRoleLeader_2') chRoleLeader_2;

  @ViewChild('chRoleAdmin_3') chRoleAdmin_3;
  @ViewChild('chRoleDirector_3') chRoleDirector_3;
  @ViewChild('chRolePrincipal_3') chRolePrincipal_3;
  @ViewChild('chRoleManager_3') chRoleManager_3;
  @ViewChild('chRoleLeader_3') chRoleLeader_3;

  @ViewChild('chRoleAdmin_4') chRoleAdmin_4;
  @ViewChild('chRoleDirector_4') chRoleDirector_4;
  @ViewChild('chRolePrincipal_4') chRolePrincipal_4;
  @ViewChild('chRoleManager_4') chRoleManager_4;
  @ViewChild('chRoleLeader_4') chRoleLeader_4;

  @ViewChild('chRoleAdmin_5') chRoleAdmin_5;
  @ViewChild('chRoleDirector_5') chRoleDirector_5;
  @ViewChild('chRolePrincipal_5') chRolePrincipal_5;
  @ViewChild('chRoleManager_5') chRoleManager_5;
  @ViewChild('chRoleLeader_5') chRoleLeader_5;

  @ViewChild('chRoleAdmin_6') chRoleAdmin_6;
  @ViewChild('chRoleDirector_6') chRoleDirector_6;
  @ViewChild('chRolePrincipal_6') chRolePrincipal_6;
  @ViewChild('chRoleManager_6') chRoleManager_6;
  @ViewChild('chRoleLeader_6') chRoleLeader_6;

  @ViewChild('chRoleAdmin_7') chRoleAdmin_7;
  @ViewChild('chRoleDirector_7') chRoleDirector_7;
  @ViewChild('chRolePrincipal_7') chRolePrincipal_7;
  @ViewChild('chRoleManager_7') chRoleManager_7;
  @ViewChild('chRoleLeader_7') chRoleLeader_7;
  
  constructor(
    private service: PermissaoService,
    private message: MessageService
  ) { }

  ngOnInit() {
    // getPermission
    // pega a relação de permissões e perfis
    this.getPermissionList();
  }

  getPermissionList() {
    this.service.get().subscribe(
      (perm) => {
        this.viewPermission = perm;
      }
    );
  }

  onEditPermission() {
    console.log();
    /*this.service.put('', this.viewEditP).subscribe(
      // alguma coisa aqui? a mensagem deve estar no serviço...
    );*/
  }

  onSaveGroup_1(id: string) { // projeto
    this.viewEditP._id = id;
    /*console.log('value: ', this.chRoleAdmin_1.nativeElement.checked);
    console.log('value: ', this.chRoleDirector_1.nativeElement.value);
    console.log('value: ', this.chRolePrincipal_1.nativeElement.value);
    console.log('value: ', this.chRoleManager_1.nativeElement.value);
    console.log('value: ', this.chRoleLeader_1.nativeElement.value);*/
    let rolePack = [];
    if (this.chRoleAdmin_1.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_1.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_1.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_1.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_1.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade de Projetos.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    //console.log('value: ', this.viewEditP);
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_2(id: string) { // indicador
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_2.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_2.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_2.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_2.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_2.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade de Indicadores.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_3(id: string) { // 
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_3.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_3.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_3.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_3.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_3.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_4(id: string) { // 
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_4.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_4.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_4.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_4.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_4.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_5(id: string) { // 
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_5.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_5.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_5.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_5.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_5.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_6(id: string) { // 
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_6.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_6.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_6.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_6.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_6.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Deve haver ao menos um perfil escolhido para a tela/funcionalidade.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }
  onSaveGroup_7(id: string) { // projeto status
    this.viewEditP._id = id;
    let rolePack = [];
    if (this.chRoleAdmin_7.nativeElement.checked) { rolePack.push('Administrador') }
    if (this.chRoleDirector_7.nativeElement.checked) { rolePack.push('director') }
    if (this.chRolePrincipal_7.nativeElement.checked) { rolePack.push('team principal') }
    if (this.chRoleManager_7.nativeElement.checked) { rolePack.push('Gerente de Projeto') }
    if (this.chRoleLeader_7.nativeElement.checked) { rolePack.push('team leader') }
    if (rolePack.length == 0) {
      this.message.warning('Atenção, deve haver ao menos um perfil escolhido para a tela/funcionalidade de alteração de status dos Projetos.', false);
      return;
    }
    this.viewEditP.role = rolePack;
    this.service.put(id, this.viewEditP).subscribe(
      // ok
    );
  }

  onSelectViewToDisplay($event) {
    console.log('evento target: ', $event.target.value);
    this.showGroup = $event.target.value;
  }

}
