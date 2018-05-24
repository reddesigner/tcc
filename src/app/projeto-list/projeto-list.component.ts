import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjetoService } from '../projeto-services/projeto.service';
import { Projeto } from '../_models/projeto.model';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.css']
})
export class ProjetoListComponent implements OnInit {

  // lista de projetos para VIEW
  public projetoList: Projeto[];

  private deleteProjectWait: Number;

  constructor(
    private projetoService: ProjetoService,
    private route: Router
  ) { }

  ngOnInit() {
    // inicia a página e carrega a lista de produtos do serviço
    this.getProjetos();
  }

  getProjetos() {
    // this.projeto_list = this.projetoService.getProjetos();
    const that = this;
    this.projetoService.getProjetos().subscribe(function(projetos) {
      console.log('projeto-list.componente getProjetos()');
      console.dir(projetos);
      that.projetoList = projetos;
    });
  }

  public onSelectEditProjeto(idProjeto: number): void {
    console.log('projeto-list.componente onSelectEditProjeto()');
    this.route.navigate(['/projeto/detail/' + idProjeto]);
  }

  public onSelectDeleteProjeto(idProjeto: number): void {
    console.log('projeto-list.componente onSelectDeleteProjeto()');
    this.deleteProjectWait = idProjeto;
  }

  public onSelectDeleteOkProjeto() {
    if (this.deleteProjectWait) {
      // chama serviço para deletar Projeto
      this.projetoService.deleteProjeto(this.deleteProjectWait);
      this.deleteProjectWait = null;
    }
  }

  public onDeselectDeleteOkProjeto() {
    this.deleteProjectWait = null;
  }
}
