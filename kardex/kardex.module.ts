import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KardexRoutingModule } from './kardex-routing.module';
import { KardexComponent } from './kardex.component';
import { KardexGeneralComponent } from './pages/kardex-general/kardex-general.component';
import { KardexReferenciaComponent } from './pages/kardex-referencia/kardex-referencia.component';


@NgModule({
  declarations: [
    KardexComponent,
    KardexGeneralComponent,
    KardexReferenciaComponent
  ],
  imports: [
    CommonModule,
    KardexRoutingModule,
    FormsModule
  ]
})
export class KardexModule { }
