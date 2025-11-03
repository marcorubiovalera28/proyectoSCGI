import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-formulario-producto',
  standalone: false,
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria: '',
    unidad_medida: '',
    precio_unitario: 0,
    estado: true
  };
  esEdicion = false;

  // Listas para las opciones de categoría y unidad de medida
  categoriasDisponibles = [
    'Alimentos y Bebidas',
    'Limpieza',
    'Higiene',
    'Ferretería',
    'Herramientas',
    'Ropa y Calzado',
    'Productos de Consumo Masivo',
    'Papelería y Oficina',
    'Farmacia y Salud',
    'Electrónica',
    'Muebles y Decoración',
    'Repuestos y Accesorios',
    'Tecnología y Computación',
    'Cosmética y Cuidado Personal',
    'Juguetería',
    'Jardinería y Agro'
  ];
  unidadesDisponibles = [
    { texto: 'unidad', valor: 'u' },
    { texto: 'paquete', valor: 'paq.' },
    { texto: 'caja', valor: 'cj.' },
    { texto: 'docena', valor: 'docena' },
    { texto: 'par', valor: 'par' },
    { texto: 'kilogramo', valor: 'kg' },
    { texto: 'gramo', valor: 'g' },
    { texto: 'litro', valor: 'L' },
    { texto: 'mililitro', valor: 'ml' },
    { texto: 'metro', valor: 'm' },
    { texto: 'centímetro', valor: 'cm' },
    { texto: 'blíster', valor: 'blíster' },
    { texto: 'frasco', valor: 'frasco' },
    { texto: 'rollo', valor: 'rollo' },
    { texto: 'bolsa', valor: 'bolsa' },
    { texto: 'set', valor: 'set' },
    { texto: 'pieza', valor: 'pieza' },
    { texto: 'galón', valor: 'galón' },
    { texto: 'barril', valor: 'barril' },
    { texto: 'tarro', valor: 'tarro' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ls: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        const productos = this.ls.getItem<Producto[]>('productos') || [];
        const encontrado = productos.find(p => p.id == +params['id']);
        if (encontrado) this.producto = { ...encontrado };
      }
    });
  }

  guardar() {
    const lista = this.ls.getItem<Producto[]>('productos') || [];

    if (this.esEdicion) {
      const index = lista.findIndex(p => p.id === this.producto.id);
      if (index !== -1) lista[index] = this.producto;
    } else {
      this.producto.id = Date.now();
      this.producto.estado = true;
      lista.push(this.producto);
    }

    this.ls.setItem('productos', lista);
    alert(this.esEdicion ? 'Producto actualizado' : 'Producto creado');
    this.router.navigate(['/productos']);
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }
}
