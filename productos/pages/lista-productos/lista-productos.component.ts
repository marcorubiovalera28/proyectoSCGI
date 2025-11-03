import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { trigger,transition,style,animate } from '@angular/animations';

@Component({
  selector: 'app-lista-productos',
  standalone: false,
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[] = [];
  busqueda: string = '';

  constructor(private router: Router,
      private ls: LocalStorageService
  ) {}

  ngOnInit(): void {
    const data = this.ls.getItem<Producto[]>('productos');
    this.productos = data ? data : [];
  }

  productosFiltrados(): Producto[] {
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  editar(producto: Producto) {
    this.router.navigate(['/productos/formulario'], { queryParams: { id: producto.id } });
  }

  nuevoProducto() {
    this.router.navigate(['/productos/formulario']);
  }
  
  verDetalle(producto: Producto) {
    this.router.navigate(['/productos/detalle'], { queryParams: { id: producto.id } });
  }

  eliminar(producto: Producto) {
    const confirmar = confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`);
    if (!confirmar) return;
  
    const lista = this.ls.getItem<Producto[]>('productos') || [];
    const actualizada = lista.filter(p => p.id !== producto.id);
    this.ls.setItem('productos', actualizada);
    this.productos = actualizada;
  
    alert('Producto eliminado correctamente');
  }

}
