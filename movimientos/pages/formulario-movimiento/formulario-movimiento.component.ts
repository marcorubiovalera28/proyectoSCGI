import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';
import { Usuario } from '../../../interfaces/usuario.interface';
import { Movimiento } from '../../../interfaces/movimiento.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-formulario-movimiento',
  standalone: false,
  templateUrl: './formulario-movimiento.component.html',
  styleUrls: ['./formulario-movimiento.component.scss']
})
export class FormularioMovimientoComponent implements OnInit {
  movimiento: Movimiento = {
    id: 0,
    producto: '',
    cantidad: 0,
    referencia: '',
    stock_anterior: 0,
    stock_actual: 0,
    usuario: '',
    estado: true,
    fecha: '',
    tipo: 'entrada' // Por defecto el tipo de movimiento es entrada
  };
  productos: Producto[] = [];
  usuarios: Usuario[] = [];
  esEdicion: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocalStorageService
  ) {}

  ngOnInit(): void {
    
    this.productos = this.ls.getItem<Producto[]>('productos') || [];
    this.usuarios = this.ls.getItem<Usuario[]>('usuarios') || [];

    // Check if editing an existing movement
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.esEdicion = true; 
        const movimientos = this.ls.getItem<Movimiento[]>('movimientos') || [];
        const encontrado = movimientos.find(m => m.id === id);
        if (encontrado) {
          this.movimiento = { ...encontrado };
        } else {
          alert('Movimiento no encontrado');
          this.router.navigate(['/movimientos']);
        }
      }
    });
  }

  guardar() {
    const lista: Movimiento[] = this.ls.getItem<Movimiento[]>('movimientos') || [];
  
    
    const historial = lista.filter(m => m.producto === this.movimiento.producto);
    const ultimoStock = historial.length ? historial[historial.length - 1].stock_actual : 0;
  
    
    if (['salida', 'merma'].includes(this.movimiento.tipo)) {
      if (this.movimiento.cantidad > ultimoStock) {
        alert('❌ No hay stock suficiente para realizar esta operación.');
        return;
      }
    }
  
    
    this.movimiento.stock_anterior = ultimoStock;
    this.movimiento.stock_actual =
      ['salida', 'merma'].includes(this.movimiento.tipo)
        ? ultimoStock - this.movimiento.cantidad
        : ultimoStock + this.movimiento.cantidad;
  
    // Asignar fecha
    if (!this.movimiento.fecha) {
      this.movimiento.fecha = new Date().toISOString().substring(0, 10);
    }
  
    // Guardar movimiento
    if (this.esEdicion) {
      const index = lista.findIndex(m => m.id === this.movimiento.id);
      if (index !== -1) {
        lista[index] = { ...this.movimiento };
      }
      alert('✅ Movimiento actualizado correctamente');
    } else {
      this.movimiento.id = Date.now();
      lista.push(this.movimiento);
      alert('✅ Movimiento registrado correctamente');
    }
  
    this.ls.setItem('movimientos', lista);
    this.router.navigate(['/movimientos']);
  }
  cancelar() {
    this.router.navigate(['/movimientos']);
  }
  
}