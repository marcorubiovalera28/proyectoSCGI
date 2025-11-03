import { Component } from '@angular/core';
import { Kardex } from '../../../interfaces/kardex.interface';

@Component({
  selector: 'app-kardex-referencia',
  standalone: false,
  templateUrl: './kardex-referencia.component.html',
  styleUrl: './kardex-referencia.component.scss'
})
export class KardexReferenciaComponent {
  referencia: string = '';
  kardexData: Kardex[] = [

    {
      id: 1,
      fecha: '2025-07-07',
      tipo_movimiento: 'entrada',
      referencia: 'C001',
      producto: 'Aceite 1L',
      cantidad: 50,
      stock_anterior: 100,
      stock_actual: 150,
      usuario: 'admin'
    },
    {
      id: 2,
      fecha: '2025-07-07',
      tipo_movimiento: 'salida',
      referencia: 'S002',
      producto: 'Filtro de aire',
      cantidad: 20,
      stock_anterior: 60,
      stock_actual: 40,
      usuario: 'luciar'
    }
  ];

  kardexFiltrado(): Kardex[] {
    const ref = this.referencia.toLowerCase().trim();
    return this.kardexData.filter(item =>
      item.referencia.toLowerCase().includes(ref)
    );
  }
}
