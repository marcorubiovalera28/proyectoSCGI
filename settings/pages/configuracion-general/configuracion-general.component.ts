import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion-general',
  standalone: false,
  templateUrl: './configuracion-general.component.html',
  styleUrl: './configuracion-general.component.scss'
})
export class ConfiguracionGeneralComponent {
  config = {
    nombre: 'SCGI',
    stockMinimo: 5
  };

  guardar() {
    console.log('Configuración guardada:', this.config);
    alert('¡Configuración actualizada!');
  }
}
