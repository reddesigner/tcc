import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'; // http!!!
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // mock api
import { InMemoryDataService } from './_models/in-memory-data.service'; // mock api
/*import { InMemoryDataServiceProjetos } from './_models/in-memory-data.service-projetos'; // mock api - projetos
import { InMemoryDataServiceIndicadores } from './_models/in-memory-data.service-indicadores'; // mock api - indicadores
import { InMemoryDataService } from './_models/in-memory-data.service-usuarios'; // mock api - usuarios*/

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoDetailComponent } from './projeto-detail/projeto-detail.component';
import { ProjetoCreateComponent } from './projeto-create/projeto-create.component';
import { ProjetoIndicadorComponent } from './projeto-indicador/projeto-indicador.component';
import { ProjetoEquipeComponent } from './projeto-equipe/projeto-equipe.component';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

import { IndicadorListComponent } from './indicador-list/indicador-list.component';
import { IndicadorCreateComponent } from './indicador-create/indicador-create.component';

import { PermissaoListComponent } from './permissao-list/permissao-list.component';

import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ProjetoEquipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataService, { dataEncapsulation: false }
    ),
    /*HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataServiceProjetos, { dataEncapsulation: false }
    ),
    HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataServiceIndicadores, { dataEncapsulation: false }
    ),
    HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataService, { dataEncapsulation: false }
    ),*/
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
