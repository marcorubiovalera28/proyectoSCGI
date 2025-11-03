import { Component } from '@angular/core';
import { Movimiento } from '../../../interfaces/movimiento.interface';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-kardex-producto',
  standalone: false,
  templateUrl: './kardex-general.component.html',
  styleUrl: './kardex-general.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class KardexGeneralComponent implements OnInit {
  kardex: Movimiento[] = [];
  productoFiltrado: string = '';
  movimientos: Movimiento[] = [];
  constructor(private ls: LocalStorageService) {}

  ngOnInit(): void {
    const data = this.ls.getItem<Movimiento[]>('movimientos');
    this.kardex = data ? data : [];
    this.cargarMovimientos();
  }
  
  movimientosFiltrados(): Movimiento[] {
    return this.kardex.filter(m =>
      m.producto.toLowerCase().includes(this.productoFiltrado.toLowerCase())
    );
  }

  cargarMovimientos() {
    const data = this.ls.getItem<Movimiento[]>('movimientos');
    this.kardex = data ? data : [];
  }
  
  
  imprimirPDF() {
    const doc = new jsPDF();

    doc.text('Reporte Kardex General', 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [[
        'Fecha', 'Tipo', 'Producto', 'Cantidad',
        'Stock Anterior', 'Stock Actual', 'Referencia', 'Usuario'
      ]],
      body: this.kardex.map(m => [
        m.fecha,
        m.tipo.charAt(0).toUpperCase() + m.tipo.slice(1),
        m.producto,
        m.cantidad,
        m.stock_anterior,
        m.stock_actual,
        m.referencia || '-',
        m.usuario
      ]),
      styles: {
        fontSize: 10
      }
    });

    doc.save('kardex_general.pdf');
  }
}