import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario.interface';
import {Router} from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: false,
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;
  busqueda: string = '';

  constructor(
    private router: Router,
    private ls: LocalStorageService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuario = this.auth.getUsuarioActual();
  }

  cargarUsuarios() {
    const data = this.ls.getItem<Usuario[]>('usuarios');
    this.usuarios = data ? data : [];
  }

  usuariosFiltrados(): Usuario[] {
    return this.usuarios.filter(u =>
      u.nombre_usuario.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  nuevoUsuario() {
    this.router.navigate(['/usuarios/formulario']);
  }

  editar(usuario: Usuario) {
    this.router.navigate(['/usuarios/formulario'], {
      queryParams: { id: usuario.id }
    });
  }

  eliminar(usuario: Usuario) {
    if (!confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre_usuario}?`)) return;

    const lista = this.usuarios.filter(u => u.id !== usuario.id);
    this.ls.setItem('usuarios', lista);
    this.usuarios = lista;
    alert('Usuario eliminado correctamente');
  }
}