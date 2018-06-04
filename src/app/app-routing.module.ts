import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './_controllers/auth/service/auth-guard.service'; // guarda de rotas

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

import { IndicadorListComponent } from './indicador-list/indicador-list.component';
import { IndicadorCreateComponent } from './indicador-create/indicador-create.component';
import { IndicadorDetailComponent } from './indicador-detail/indicador-detail.component';
import { IndicadorEditComponent } from './indicador-edit/indicador-edit.component';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

import { PermissaoListComponent } from './permissao-list/permissao-list.component';

import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';

const routes: Routes = [
  { path: 'projeto', component: ProjetoListComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/create', component: ProjetoCreateComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/detail/:id', component: ProjetoDetailComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/edit/:id', component: ProjetoEditComponent, canActivate: [AuthGuardService] },

  { path: 'projeto/indicador/:id', component: ProjetoIndicadorComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/indicador-fase/:id', component: ProjetoIndicadorFaseComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/equipe/:id', component: ProjetoEquipeComponent, canActivate: [AuthGuardService] },
  { path: 'projeto/status/:id', component: ProjetoStatusComponent, canActivate: [AuthGuardService] },
  
  { path: 'usuario', component: UsuarioListComponent, canActivate: [AuthGuardService] },
  { path: 'usuario/create', component: UsuarioCreateComponent, canActivate: [AuthGuardService] },
  { path: 'usuario/detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuardService] },
  { path: 'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [AuthGuardService] },

  { path: 'indicador', component: IndicadorListComponent, canActivate: [AuthGuardService] },
  { path: 'indicador/create', component: IndicadorCreateComponent, canActivate: [AuthGuardService] },
  { path: 'indicador/detail/:id', component: IndicadorDetailComponent, canActivate: [AuthGuardService] },
  { path: 'indicador/edit/:id', component: IndicadorEditComponent, canActivate: [AuthGuardService] },
  
  { path: 'permissao', component: PermissaoListComponent, canActivate: [AuthGuardService] },

  { path: 'relatorio', component: RelatorioListComponent, canActivate: [AuthGuardService] },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }, // única página que não precisa estar logado nem permissão
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } // não deveria ser uma página padrão tipo 404?
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
