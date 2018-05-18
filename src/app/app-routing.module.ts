import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ProjetoDetailComponent } from './projeto-detail/projeto-detail.component';
import { ProjetoCreateComponent } from './projeto-create/projeto-create.component';
import { ProjetoIndicadorComponent } from './projeto-indicador/projeto-indicador.component';
import { ProjetoEquipeComponent } from './projeto-equipe/projeto-equipe.component';

import { IndicadorListComponent } from './indicador-list/indicador-list.component';
import { IndicadorCreateComponent } from './indicador-create/indicador-create.component';

import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

import { PermissaoListComponent } from './permissao-list/permissao-list.component';

import { RelatorioListComponent } from './relatorio-list/relatorio-list.component';
/*import {} from '';*/

const routes: Routes = [
  { path: 'projeto', component: ProjetoListComponent},
  { path: 'projeto/create', component: ProjetoCreateComponent},
  { path: 'projeto/detail', component: ProjetoDetailComponent},
  { path: 'projeto/indicador', component: ProjetoIndicadorComponent},
  { path: 'projeto/equipe', component: ProjetoEquipeComponent},

  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: 'usuario/detail/:id', component: UsuarioDetailComponent },

  { path: 'indicador', component: IndicadorListComponent },
  { path: 'indicador/create', component: IndicadorCreateComponent },

  { path: 'permisao', component: PermissaoListComponent },

  { path: 'relatorio', component: RelatorioListComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' }
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
