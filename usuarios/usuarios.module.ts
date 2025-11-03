import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListaUsuariosComponent,
    FormularioUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]
})
export class UsuariosModule { }
