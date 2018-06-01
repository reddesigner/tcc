import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

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
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'projeto', component: ProjetoListComponent},
  { path: 'projeto/create', component: ProjetoCreateComponent},
  { path: 'projeto/detail/:id', component: ProjetoDetailComponent},
  { path: 'projeto/edit/:id', component: ProjetoEditComponent},

  { path: 'projeto/indicador/:id', component: ProjetoIndicadorComponent},
  { path: 'projeto/indicador-fase/:id', component: ProjetoIndicadorFaseComponent},
  { path: 'projeto/equipe/:id', component: ProjetoEquipeComponent},
  { path: 'projeto/status/:id', component: ProjetoStatusComponent},
  
  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: 'usuario/detail/:id', component: UsuarioDetailComponent },
  { path: 'usuario/edit/:id', component: UsuarioEditComponent },

  { path: 'indicador', component: IndicadorListComponent },
  { path: 'indicador/create', component: IndicadorCreateComponent },
  { path: 'indicador/detail/:id', component: IndicadorDetailComponent },
  { path: 'indicador/edit/:id', component: IndicadorEditComponent },
  
  { path: 'permissao', component: PermissaoListComponent },

  { path: 'relatorio', component: RelatorioListComponent },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
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
