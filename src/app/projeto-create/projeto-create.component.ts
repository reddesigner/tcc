import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';

declare var jquery: any;
declare var $: any;

import { MessageService } from '../_controllers/message/service/message.service';

import { ProjetoService } from '../projeto-services/projeto.service';

import { Projeto } from '../_models/projeto.model';
import { Usuario } from '../_models/usuarios.model';

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.css']
})
export class ProjetoCreateComponent implements OnInit {

  public newProject: Projeto = new Projeto();
  public listUsers: Usuario[];

  @ViewChild('dateStart') dateStart;
  @ViewChild('datePrevision') datePrevision;
  @ViewChild('dateEnd') dateEnd;

  @ViewChild('selectRisk') selectRisk;
  @ViewChild('selectStatus') selectStatus;
  @ViewChild('selectManager') selectManager;
  
  constructor(
    private projetoService: ProjetoService,
    private location: Location
  ) { }

  ngOnInit() {
    // jquery datepicker
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
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

  onSave() {
    if ( this.validate() ) {
      // post service
      this.projetoService.postProjeto(this.newProject).subscribe(
        () => {
          this.goBack(); // ou faz uma rota para a lista de projetos?
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }

  validate() {
    if (this.dateStart.nativeElement.value != '')
      this.newProject.dateStart = new Date(this.formatDate(this.dateStart.nativeElement.value));
    if (this.dateEnd.nativeElement.value != '')
      this.newProject.dateEnd = new Date(this.formatDate(this.dateEnd.nativeElement.value));
    if (this.datePrevision.nativeElement.value != '')
      this.newProject.datePrevision = new Date(this.formatDate(this.datePrevision.nativeElement.value));
    this.newProject.risk = this.selectRisk.nativeElement.value;
    this.newProject.status = this.selectStatus.nativeElement.value;
    this.newProject.manager = { 
      _id: this.selectManager.nativeElement.value, 
      name: this.selectManager.nativeElement.selectedOptions[0].dataset.name, 
      email: this.selectManager.nativeElement.selectedOptions[0].dataset.email,
      role: this.selectManager.nativeElement.selectedOptions[0].dataset.role
    };
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

}
