import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

declare var jquery: any;
declare var $: any;

import { MessageService } from '../_controllers/message/service/message.service';

import { ProjetoService } from '../projeto-services/projeto.service';

import { Projeto } from '../_models/projeto.model';
import { Usuario } from '../_models/usuarios.model';

@Component({
  selector: 'app-projeto-edit',
  templateUrl: './projeto-edit.component.html',
  styleUrls: ['./projeto-edit.component.css']
})
export class ProjetoEditComponent implements OnInit {

  public currentProject: Projeto = new Projeto();
  public listUsers: Usuario[]; // usuários c/ perfil de gerente

  public disbleJustification = true;

  public initDateStart: string = '';
  public initDateEnd: string = '';
  public initDatePrevision: string = '';

  @ViewChild('dateStart') dateStart;
  @ViewChild('datePrevision') datePrevision;
  @ViewChild('dateEnd') dateEnd;

  @ViewChild('selectRisk') selectRisk;
  @ViewChild('selectStatus') selectStatus;

  constructor(
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private message: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
    // jquery datepicker
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
    //
    this.getProjeto();
  }

  getProjeto() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projetoService.getProjetoById(id).subscribe(
      prj => {
        this.currentProject = prj;
        //console.log('projeto-edit.componente.ts ----- ', this.currentProject);
        // formatar e imprimir datas
        if (this.currentProject.dateStart) {
          let ds = new Date(this.currentProject.dateStart);
          let ds1 = ds.getDate();
          let ds2 = ds.getMonth();
          let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
          this.initDateStart = dss;
        }
        if (this.currentProject.dateEnd) {
          let ds = new Date(this.currentProject.dateEnd);
          let ds1 = ds.getDate();
          let ds2 = ds.getMonth();
          let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
          this.initDateEnd = dss;
        }
        if (this.currentProject.datePrevision) {
          let ds = new Date(this.currentProject.datePrevision);
          let ds1 = ds.getDate();
          let ds2 = ds.getMonth();
          let dss = ( ds1.toString().length == 1 ? '0'+ds1 : ds1 ) + '/' + ( ds2.toString().length == 1 ? '0'+ds2 : ds2 ) + '/' + ds.getFullYear();
          this.initDatePrevision = dss;
        }
      }
    );
    //
    this.getManagers();
  }

  getManagers() {
    this.projetoService.getGerentes().subscribe(
      (obj) => {
        this.listUsers = obj;
      }
    );
  }

  byId(item1: Usuario, item2: Usuario) {
    return item1._id === item2._id;
  }

  onSave() {
    if ( this.validate() ) {
      // post service
      this.projetoService.putProjeto(this.currentProject).subscribe(
        () => {
          this.goBack(); // ou faz uma rota para a lista de projetos?
        }
      );
    }
  }

  public goBack(): void {
    this.location.back();
  }

  validate() {
    if (this.dateStart.nativeElement.value != '')
      this.currentProject.dateStart = new Date(this.formatDate(this.dateStart.nativeElement.value));
    if (this.dateEnd.nativeElement.value != '')
      this.currentProject.dateEnd = new Date(this.formatDate(this.dateEnd.nativeElement.value));
    if (this.datePrevision.nativeElement.value != '')
      this.currentProject.datePrevision = new Date(this.formatDate(this.datePrevision.nativeElement.value));
    this.currentProject.risk = this.selectRisk.nativeElement.value;
    this.currentProject.status = this.selectStatus.nativeElement.value;
    console.log('projeto-edit.component.ts ---- projeto antes de ser salvo', this.currentProject);
    if (!this.disbleJustification && this.currentProject.justification == undefined) {
      console.log('projeto-edit.componente.ts ----- É necessário escrever uma justificativa');
      this.message.warning('Essa mudança de status exige que uma justificativa seja informada');
      return false;
      // TODO mandar tbm o usuario e a data da alteração de status!!!!!!!!!! tenho que pegar o usuário logado!!!!!!!!!!!
      // o status não deve ser alterado aqui!!!!!!!!!!!! tem que ter uma tela só pra ele!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    //
    return true;
  }

  formatDate(data: string): string {
    if (data == '' || data == undefined)
      return null;
    let dia = data.substr(0, 2);
    let mes = data.substr(3, 2);
    let ano = data.substr(6, 4);
    return mes + '/' + dia + '/' + ano;
  }

  changeStatus($event) {
    //console.log($event.target.value);
    if ($event.target.value == 'Cancelado' || $event.target.value == 'Análise aprovada') {
      this.disbleJustification = false;
    } else {
      this.disbleJustification = true;
    }
  }

}
