import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';
import { UsuariosGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [UsuariosGuard],
    children: [
      { path: '', component: ListaUsuariosComponent },
      { path: 'formulario', component: FormularioUsuarioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
