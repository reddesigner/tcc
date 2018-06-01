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

  private deleteProjectWait: string;

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
      console.log('projeto-list.componente getProjetos()', projetos);
      that.projetoList = projetos;
    });
  }

  onNewProject() {
    console.log('in para um novo projeto...');
    this.route.navigate(['/projeto/create']);
  }

  onSelectTeam(id: string) {
    console.log('selecionar time para projeto id', id);
    this.route.navigate(['/projeto/equipe/' + id]);
  }

  onSelectStatus(id: string) {
    console.log('selecionar status para projeto id', id);
    this.route.navigate(['/projeto/status/' + id]);
  }

  onSelectIndicators(id: string) {
    console.log('selecionar indicadores para projeto id', id);
    this.route.navigate(['/projeto/indicador-fase/' + id]);
  }

  public onSelectEditProjeto(idProjeto: string): void {
    console.log('projeto-list.componente onSelectEditProjeto()');
    this.route.navigate(['/projeto/edit/' + idProjeto]);
  }

  public onSelectDeleteProjeto(idProjeto: string): void {
    console.log('projeto-list.componente onSelectDeleteProjeto()');
    this.deleteProjectWait = idProjeto;
  }

  public onSelectDeleteOkProjeto() {
    console.log('deletando...');
    if (this.deleteProjectWait) {
      console.log('realmente deletando...');
      // chama serviço para deletar Projeto
      this.projetoService.deleteProjeto(this.deleteProjectWait).subscribe(
        (obj) => {
          console.log('deletado!', obj);
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
