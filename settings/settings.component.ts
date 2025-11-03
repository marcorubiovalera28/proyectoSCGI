import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { OnInit } from '@angular/core';
import { UsuariosGuard } from '../../core/guards/auth.guard';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  usuario!: Usuario | null;
  mensaje: string = '';
  modoOscuro: boolean = false;
  inicioPreferido: string = 'dashboard';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();
    this.modoOscuro = localStorage.getItem('modoOscuro') === 'true';
    this.inicioPreferido = localStorage.getItem('inicioPreferido') || 'dashboard';
    this.aplicarModoOscuro();
  }

  toggleModoOscuro() {
    localStorage.setItem('modoOscuro', String(this.modoOscuro));
    this.aplicarModoOscuro();
  }

  aplicarModoOscuro() {
    if (this.modoOscuro) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  guardarInicioPreferido() {
    localStorage.setItem('inicioPreferido', this.inicioPreferido);
    this.mensaje = '✅ Preferencia de inicio guardada.';
    setTimeout(() => this.mensaje = '', 3000);
  }
}