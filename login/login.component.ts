import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Inicializar usuarios si aún no existen
    const usuarios = localStorage.getItem('usuarios');
    if (!usuarios) {
      localStorage.setItem('usuarios', JSON.stringify([
        { nombre_usuario: 'admin', contrasenia: '1234', rol: 'Administrador', estado: true },
        { nombre_usuario: 'empleado', contrasenia: 'abcd', rol: 'Empleado', estado: true }
        
      ]));
      console.log('Usuarios iniciales creados');
    }
  }
  login() {
    const exito = this.authService.login(
      this.formulario.value.usuario,
      this.formulario.value.contraseña
    );
    if (exito) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas o usuario inactivo';
    }
  }
}