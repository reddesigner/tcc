import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_controllers/auth/service/auth.service';
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

  private deleteProjectWait: string;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    // inicia a página e carrega a lista de produtos do serviço
    this.getProjetos();
  }

  getProjetos() {
    // this.projeto_list = this.projetoService.getProjetos();
    const that = this;
    this.projetoService.getProjetos().subscribe(function(projetos) {
      //console.log('projeto-list.component.js --- getProjetos()', projetos);
      that.projetoList = projetos;
    });
  }

  onNewProject() {
    //console.log('projeto-list.component.js --- indo para um novo projeto...');
    this.router.navigate(['/projeto/create']);
  }

  onSelectTeam(id: string) {
    //console.log('projeto-list.component.js --- selecionar time para projeto id', id);
    this.router.navigate(['/projeto/equipe/' + id]);
  }

  onSelectStatus(id: string) {
    //console.log('projeto-list.component.js --- selecionar status para projeto id', id);
    this.router.navigate(['/projeto/status/' + id]);
  }

  onSelectIndicators(id: string) {
    //console.log('projeto-list.component.js --- selecionar indicadores para projeto id', id);
    this.router.navigate(['/projeto/indicador/' + id]);
  }

  onSelectIndicatorsPhases(id: string) {
    //console.log('projeto-list.component.js --- selecionar indicadores para projeto id', id);
    this.router.navigate(['/projeto/indicador-fase/' + id]);
  }

  public onSelectEditProjeto(idProjeto: string): void {
    //console.log('projeto-list.component.js --- onSelectEditProjeto()');
    this.router.navigate(['/projeto/edit/' + idProjeto]);
  }

  public onSelectDeleteProjeto(idProjeto: string): void {
    //console.log('projeto-list.component.js --- onSelectDeleteProjeto()');
    this.deleteProjectWait = idProjeto;
  }

  public onSelectDeleteOkProjeto() {
    //console.log('projeto-list.component.js --- deletando...');
    if (this.deleteProjectWait) {
      //console.log('projeto-list.component.js --- realmente deletando...');
      // chama serviço para deletar Projeto
      this.projetoService.deleteProjeto(this.deleteProjectWait).subscribe(
        (obj) => {
          //console.log('projeto-list.component.js --- deletado!', obj);
          // o delete retorna uma msg, não um objeto do tipo que o Observable espera
          if (obj && obj['type'] && obj['type'] == 'success') {
            // atualiza lista de projetos na view
            this.projetoList = this.projetoList.filter(
              el => {
                return el._id !== this.deleteProjectWait
              }
            );
            this.deleteProjectWait = null;
          }
        }
      );
      //this.deleteProjectWait = null;
    }
  }

  public onDeselectDeleteOkProjeto() {
    this.deleteProjectWait = null;
  }
}
