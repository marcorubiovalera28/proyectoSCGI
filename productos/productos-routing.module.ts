import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { FormularioProductoComponent } from './pages/formulario-producto/formulario-producto.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

const routes: Routes = [
  { path: '', component: ListaProductosComponent },
  { path: 'formulario', component: FormularioProductoComponent },
  { path: 'detalle', component: DetalleProductoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { 
}
