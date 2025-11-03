import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { ListaMovimientosComponent } from './pages/lista-movimientos/lista-movimientos.component';
import { FormularioMovimientoComponent } from './pages/formulario-movimiento/formulario-movimiento.component';

@NgModule({
  declarations: [
    ListaMovimientosComponent,
    FormularioMovimientoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule {}
