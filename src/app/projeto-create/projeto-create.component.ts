import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-projeto-create',
  templateUrl: './projeto-create.component.html',
  styleUrls: ['./projeto-create.component.css']
})
export class ProjetoCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // jquery datepicker
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    });
    //
  }

}
