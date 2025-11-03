import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Producto } from '../interfaces/producto.interface';
import { Movimiento } from '../interfaces/movimiento.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = [];
  movimientos: Movimiento[] = [];
  stockTotal: number = 0;
  labels: string[] = [];
  data: number[] = [];
  productosSinStock: string[] = [];

  isBrowser: boolean = false;

  constructor(
    private ls: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    
    this.productos = this.ls.getItem<Producto[]>('productos') || [];
    this.movimientos = this.ls.getItem<Movimiento[]>('movimientos') || [];

    this.calcularStockPorProducto();
  }

  calcularStockPorProducto() {
    const stockMap: { [producto: string]: number } = {};

    for (const movimiento of this.movimientos) {
      const nombre = movimiento.producto;
      if (!stockMap[nombre]) {
        stockMap[nombre] = 0;
      }

      if (['entrada', 'traslado'].includes(movimiento.tipo)) {
        stockMap[nombre] += movimiento.cantidad;
      } else if (['salida', 'merma'].includes(movimiento.tipo)) {
        stockMap[nombre] -= movimiento.cantidad;
        if (stockMap[nombre] < 0) stockMap[nombre] = 0;
      }
    }

    this.labels = Object.keys(stockMap);
    this.data = Object.values(stockMap);
    this.productosSinStock = this.labels.filter((prod, i) => this.data[i] === 0);

    this.stockTotal = this.data.reduce((acc, val) => acc + val, 0);
  }
}
