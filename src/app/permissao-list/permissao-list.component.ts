import { Component, OnInit } from '@angular/core';

import { Permissao } from '../_models/permissao.model';

import { PermissaoService } from '../permissao-service/permissao.service';

@Component({
  selector: 'app-permissao-list',
  templateUrl: './permissao-list.component.html',
  styleUrls: ['./permissao-list.component.css']
})
export class PermissaoListComponent implements OnInit {

  public viewPermission: Permissao;
  public viewViews = [
    { view: 'Projetos', value: 'prj' },
    { view: 'Projetos - Indicadores', value: 'prj-ind' },
    { view: 'Projetos - Indicadores - Fases', value: 'prj-ind-fas' },
    { view: 'Indicadores', value: 'ind' },
    { view: 'Usuários', value: 'usr' },
    { view: 'Relatórios', value: 'rel' }
  ];
  public showGroup: String = 'prj'; // inicia-se com o grupo de projetos sendo exibidos

  constructor(
    private service: PermissaoService
  ) { }

  ngOnInit() {
    // getPermission
    // pega a relação de permissões e perfis
    this.getPermissionList();
  }

  getPermissionList() {
    /*this.service.getPermissionList().subscribe(
      (perm) => {
        this.viewPermission = perm;
      }
    );*/
  }

  onSelectViewToDisplay($event) {
    console.log($event.target.value);
    this.showGroup = $event.target.value;
  }

}
