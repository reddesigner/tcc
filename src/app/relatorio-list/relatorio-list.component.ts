import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio-service/relatorio.service';
import { Projeto } from '../_models/projeto.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-relatorio-list',
  templateUrl: './relatorio-list.component.html',
  styleUrls: ['./relatorio-list.component.css']
})
export class RelatorioListComponent implements OnInit {

  public reportProjectLis: Projeto[];
  public reportProjectLis_Filtered: Projeto[];

  constructor(
    private relatorio: RelatorioService
  ) { }

  ngOnInit() {
    // jquery datepicker
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
    //
    this.getDataAll();
  }

  getDataAll() {
    this.relatorio.getAll().subscribe(
      (res) => {
        this.reportProjectLis = res;
        this.reportProjectLis_Filtered = res;
      }
    );
  }

  onChangeFilter($event) {
    console.log($event.target.value);
      if ($event.target.value) {
      this.reportProjectLis_Filtered = this.reportProjectLis.filter(
        (el) => el._id == $event.target.value
      );
    } else {
      this.reportProjectLis_Filtered = this.reportProjectLis;
    }
  }

}
