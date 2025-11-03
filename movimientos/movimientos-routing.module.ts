import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMovimientosComponent } from './pages/lista-movimientos/lista-movimientos.component';
import { FormularioMovimientoComponent } from './pages/formulario-movimiento/formulario-movimiento.component';

const routes: Routes = [
  { path: '', component: ListaMovimientosComponent },
  { path: 'formulario', component: FormularioMovimientoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
