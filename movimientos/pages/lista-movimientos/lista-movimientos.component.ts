import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movimiento } from '../../../interfaces/movimiento.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { trigger,transition,style,animate } from '@angular/animations';
@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ListaMovimientosComponent implements OnInit {
  movimientos: Movimiento[] = [];
  busqueda: string = '';

  constructor(
    private ls: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.ls.getItem<Movimiento[]>('movimientos');
    this.movimientos = data ? data : [];
  }

  movimientosFiltrados(): Movimiento[] {
    return this.movimientos.filter(m =>
      m.producto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      m.usuario.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      m.tipo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      m.referencia?.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  registrarNuevo() {
    this.router.navigate(['/movimientos/formulario']);
  }

  eliminar(movimiento: Movimiento) {
    const confirmar = confirm(`¿Eliminar el movimiento de "${movimiento.producto}"?`);
    if (!confirmar) return;

    const actualizados = this.movimientos.filter(m => m.id !== movimiento.id);
    this.ls.setItem('movimientos', actualizados);
    this.movimientos = actualizados;

    alert('Movimiento eliminado correctamente');
  }
  editar(movimiento: Movimiento) {
    this.router.navigate(['/movimientos/formulario'], {
      queryParams: { id: movimiento.id }
    });
  }
}
