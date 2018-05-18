import { Component, OnInit } from '@angular/core';

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

  constructor(
    private projetoService: ProjetoService
  ) { }

  ngOnInit() {
    this.getProjetos();
  }

  getProjetos() {
    // this.projeto_list = this.projetoService.getProjetos();
    const that = this;
    this.projetoService.getProjetos().subscribe(function(projetos) {
      console.dir(projetos);
      that.projetoList = projetos;
    });
  }

}
