import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; // http!!!
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // mock api
// import { InMemoryDataService } from './_models/in-memory-data.service'; // mock api

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_controllers/auth/interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './autenticar/login.component';
import { HomeComponent } from './home/home.component';

import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoDetailComponent } from './projeto-detail/projeto-detail.component';
import { ProjetoCreateComponent } from './projeto-create/projeto-create.component';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';
import { ProjetoIndicadorComponent } from './projeto-indicador/projeto-indicador.component';
import { ProjetoIndicadorFaseComponent } from './projeto-indicador-fase/projeto-indicador-fase.component';
import { ProjetoEquipeComponent } from './projeto-equipe/projeto-equipe.component';
import { ProjetoStatusComponent } from './projeto-status/projeto-status.component';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

import { IndicadorListComponent } from './indicador-list/indicador-list.component';
import { IndicadorCreateComponent } from './indicador-create/indicador-create.component';
import { IndicadorDetailComponent } from './indicador-detail/indicador-detail.component';
import { IndicadorEditComponent } from './indicador-edit/indicador-edit.component';

import { PermissaoListComponent } from './permissao-list/permissao-list.component';

import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';

import { MessageComponent } from './_controllers/message/component/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjetoListComponent,
    ProjetoDetailComponent,
    ProjetoCreateComponent,
    ProjetoEditComponent,
    ProjetoIndicadorComponent,
    ProjetoIndicadorFaseComponent,
    ProjetoEquipeComponent,
    ProjetoStatusComponent,
    UsuarioListComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    UsuarioDetailComponent,
    IndicadorListComponent,
    IndicadorCreateComponent,
    IndicadorDetailComponent,
    IndicadorEditComponent,
    PermissaoListComponent,
    RelatorioListComponent,
    MessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    /*HttpClientInMemoryWebApiModule.forRoot( // mock api
      InMemoryDataService, { dataEncapsulation: false }
    ),*/
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
