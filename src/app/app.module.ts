import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; // http!!!
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // mock api
import { InMemoryDataService } from './_models/in-memory-data.service'; // mock api

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoDetailComponent } from './projeto-detail/projeto-detail.component';
import { ProjetoCreateComponent } from './projeto-create/projeto-create.component';
import { ProjetoIndicadorComponent } from './projeto-indicador/projeto-indicador.component';
import { ProjetoIndicadorFaseComponent } from './projeto-indicador-fase/projeto-indicador-fase.component';
import { ProjetoEquipeComponent } from './projeto-equipe/projeto-equipe.component';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

import { IndicadorListComponent } from './indicador-list/indicador-list.component';
import { IndicadorCreateComponent } from './indicador-create/indicador-create.component';

import { PermissaoListComponent } from './permissao-list/permissao-list.component';

import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';
import { IndicadorDetailComponent } from './indicador-detail/indicador-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjetoListComponent,
    ProjetoDetailComponent,
    ProjetoCreateComponent,
    UsuarioListComponent,
    IndicadorListComponent,
    PermissaoListComponent,
    RelatorioListComponent,
    UsuarioCreateComponent,
    UsuarioDetailComponent,
    IndicadorCreateComponent,
    ProjetoIndicadorComponent,
    ProjetoIndicadorFaseComponent,
    ProjetoEquipeComponent,
    IndicadorDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
