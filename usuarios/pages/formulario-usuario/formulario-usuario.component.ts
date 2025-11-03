import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-formulario-usuario',
  standalone: false,
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'] 
})
export class FormularioUsuarioComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre_usuario: '',
    contrasenia: '',
    rol: '',
    estado: true
  };

  cambiarClave: boolean = false;
  nuevaContrasenia: string = '';
  esEdicion: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.esEdicion = true;

        const lista = this.ls.getItem<Usuario[]>('usuarios') || [];
        const encontrado = lista.find(u => u.id === id);
        if (encontrado) {
          this.usuario = { ...encontrado };
        } else {
          alert('Usuario no encontrado');
          this.router.navigate(['/usuarios']);
        }
      }
    });
  }
  
  guardar() {
    const lista = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
    if (this.esEdicion) {
      const index = lista.findIndex((u: any) => u.id === this.usuario.id);
      if (index !== -1) {
        if (this.cambiarClave) {
          this.usuario.contrasenia = this.nuevaContrasenia;
        }
        lista[index] = this.usuario;
      }
      alert('Usuario actualizado correctamente');
    } else {
      this.usuario.id = Date.now();
      this.usuario.estado = true;
      lista.push(this.usuario);
      alert('Usuario creado correctamente');
    }

    localStorage.setItem('usuarios', JSON.stringify(lista));
    this.router.navigate(['/usuarios']);
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}

