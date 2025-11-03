import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { FormularioProductoComponent } from './pages/formulario-producto/formulario-producto.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    FormularioProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule
  ]
})
export class ProductosModule { }
